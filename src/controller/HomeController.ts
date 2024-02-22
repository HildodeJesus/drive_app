import { Request, Response } from "express";

import { FileRepo } from "../repositories/FileRepo";
import S3 from "../services/S3";
export class HomeController {
  async index(req: Request, res: Response) {
    const files = await new FileRepo().getByUser(req.session.user.id)

    const folderName = 'user-files'
    const region = "us-east-1"
    let filesWithSignedUrl = []

    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i]
      const key = folderName + '/' + currentFile.fileName

      const signedUrl = await new S3({region}).getSignedUrlDownload({
        Bucket: process.env.S3_BUCKET, 
        Key: key
      }, 1440)

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