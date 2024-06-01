import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/types'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email)
    if (!user) return null
    const passwordIsMatch = await argon2.verify(user.password, pass)
    if (passwordIsMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: IUser) {
    const payload = { email: user.email, id: user.id }
    return {
      ...payload,
      token: this.jwtService.sign(payload),
    }
  }
}
