import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = await this.userService.create(createUserDto)
    return restUser
  }

  @Get()
  async findOne(@Param('email') email: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = await this.userService.findOne(email)
    return restUser
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll()
  // }

  // @Patch(':id')
  // @UsePipes(new ValidationPipe())
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
