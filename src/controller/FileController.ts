import { NextFunction, Request, Response } from "express";

import { File } from "../entities/File";
import { FileRepo } from "../repositories/FileRepo";
import S3 from "../services/S3";

export class FileController {
  async getSignedS3Url(req: Request, res: Response, next: NextFunction) {
    try {
      const folderName = 'user-files'
      const fileName = req.query['file_name'] as string
      const fileType = req.query["file_type"] as string
      const region = "us-east-1"
      const Bucket = process.env.S3_BUCKET
      const Key = folderName + '/' + fileName

      const signedUrl = await new S3({region}).getSignedUrlUpload({Bucket, Key, ContentType: fileType}, 60)

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