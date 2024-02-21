import { Request, Response } from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

import { FileRepo } from "../repositories/FileRepo";
export class HomeController {
  async index(req: Request, res: Response) {
    const files = await new FileRepo().getByUser(req.session.user.id)

    const folderName = 'user-files'
    const region = "us-east-1"
    const client = new S3Client({region})
    const bucket = process.env.S3_BUCKET

    let filesWithSignedUrl = []

    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i]
      const key = folderName + '/' + currentFile.fileName
      const command = new GetObjectCommand({Bucket: bucket, Key: key})
      
      const signedUrl = await getSignedUrl(client, command, {expiresIn: 1440})
      filesWithSignedUrl.push({
        ...currentFile,
        signedUrl
      })
    }
    
    return res.render("home", {
      files: filesWithSignedUrl
    })
  }
}