import { NextFunction, Request, Response } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

import { File } from "../entities/File";
import { FileRepo } from "../repositories/FileRepo";
import { parseUrl } from "@smithy/url-parser";
import { fromIni } from "@aws-sdk/credential-providers";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";

export class FileController {
  async getSignedS3Url(req: Request, res: Response, next: NextFunction) {
    try {
      const folderName = 'user-files'
      const fileName = req.query['file_name'] as string
      const region = "us-east-1"
      const bucket = process.env.S3_BUCKET
      const key = folderName + '/' + fileName

      const client = new S3Client({region})
      const command = new PutObjectCommand({Bucket: bucket, Key: key})
      const signedUrl = await getSignedUrl(client, command, {expiresIn: 60})
 

      const newFile = new File({
        fileName, 
        userId: req.session.user.id, 
        s3Url:`https://${process.env.S3_BUCKET}.s3.amazonaws.com/${folderName}/${fileName}`, 
      })

      await new FileRepo().create(newFile)

      const returnData = {
        signedUrl,
        url: newFile.s3Url
      }

      res.status(200).json(returnData)
    } catch (error) {
      next(error)
    }
  }
}