
import { createCustomError } from "../error/CustomError";
import DB from "../database";
import { File } from "../entities/File";

export class FileRepo {
  async create(file: File){
    const errors = await this.validate(file)
    if(errors.length > 0) throw createCustomError('Temos problema chefia!', 400)

    await DB.table('files').insert(file)
    return
  }

  async getByUser(userId: string) {
    let files: File[] = await DB.table('files').select().where({userId: userId})
    files = JSON.parse(JSON.stringify(files))

    return files
  }

  async getById(id: string) {
    let file: File[] = await DB.table('files').select().where({id: id})
    file = JSON.parse(JSON.stringify(file))

    return file[0]
  }

  async validate(file: File) {
    let errors = []
    
    if(!file.fileName) errors.push("Nome do arquivo inválido!")
    if(!file.s3Url) errors.push("Necessário a url!")
    if(!file.userId) errors.push("Id do usuário não passada!")

    return errors
  }
}