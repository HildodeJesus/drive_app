export class CustomError extends Error {
  message: string;
  statusCode: number;
  errors?: string[]

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}

export function createCustomError(message: string, statusCode: number, errors?: string[]) {
  return new CustomError(message, statusCode, errors)
}