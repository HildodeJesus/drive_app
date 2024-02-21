import { v4 } from "uuid";

export class File {
  public id?: string;
  public fileName: string;
  public s3Url: string;
  public userId: string;
  public created_at?: Date
  public updated_at?: Date


  constructor(props: File) {
    this.id = v4()
    this.fileName = props.fileName
    this.s3Url = props.s3Url
    this.userId = props.userId
    this.created_at = new Date()
    this.updated_at = new Date()
  }
}