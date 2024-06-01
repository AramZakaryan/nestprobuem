import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // check if a user with the same email already exists
    const existUser = await this.userRepository.findOneBy({ email: createUserDto.email })
    if (existUser) throw new BadRequestException('user exists')

    let user: User
    // user creating
    try {
      user = await this.userRepository.save({
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      })
    } catch (err) {
      new BadRequestException(err)
    }

    // jwt token creating
    const payload = { email: user.email, id: user.id }
    const token = this.jwtService.sign(payload)

    return { ...user, token }
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email })
  }
}
