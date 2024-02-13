import { v4 } from "uuid";

export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public created_at?: Date
  public updated_at?: Date

  constructor(props: User) {
    this.id = v4()
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.created_at = new Date()
    this.updated_at = new Date()
  }
}