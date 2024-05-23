import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    // Check if a user with the same email already exists
    const existUser = await this.userRepository.findOneBy({ email: createUserDto.email })
    if (existUser) throw new BadRequestException('user exists')
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: '',
    })
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  // async findAll() {
  //   return await this.userRepository.find({}).catch((err) => new BadRequestException(err))
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
