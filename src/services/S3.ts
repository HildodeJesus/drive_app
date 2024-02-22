import { GetObjectCommand, GetObjectCommandInput, PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

interface S3ServiceConfig {
  region: string
}

export default class S3 {
  public region: string
  private client?: S3Client

  constructor(props: S3ServiceConfig) {
    Object.assign(this, props)
    this.client = new S3Client({region: this.region})
  }

  async getSignedUrlUpload(bucketConfig: PutObjectCommandInput, expires?: number) {
    const command = new PutObjectCommand({...bucketConfig})
    const signedUrl = await getSignedUrl(this.client, command, {expiresIn: expires})

    return signedUrl
  }

   async getSignedUrlDownload(bucketConfig: GetObjectCommandInput, expires?: number) {
    const command = new GetObjectCommand({...bucketConfig})
    const signedUrl = await getSignedUrl(this.client, command, {expiresIn: expires})

    return signedUrl
  }
}