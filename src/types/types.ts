export interface IUser {
  id: number
  email: string
}

export interface CustomRequest extends Express.Request {
  user: IUser & {
    [key: string]: any // Allow for additional user properties
  }
}
