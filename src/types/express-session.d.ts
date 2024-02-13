import { User } from "../entities/User";
import "express-session"

declare module 'express-session' {
  export interface SessionData {
    user: Omit<User, "password" | "created_at" | "updated_at">
  }
}