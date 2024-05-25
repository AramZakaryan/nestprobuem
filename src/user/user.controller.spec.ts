import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

describe('UserController', () => {
  let controller: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // describe('create', () => {
  //   it('should call the userService.create method', async () => {
  //     const createUserDto: CreateUserDto = {
  //       email: 'test@example.com',
  //       password: 'testpassword',
  //     }
  //
  //     jest.spyOn(userService, 'create').mockImplementation(() => Promise.resolve(createUserDto))
  //
  //     const result = await controller.create(createUserDto)
  //     expect(userService.create).toHaveBeenCalledWith(createUserDto)
  //     expect(result).toEqual(createUserDto)
  //   })
  // })

  // describe('findOne', () => {
  //   it('should call the userService.findOne method', async () => {
  //     const createUserDto: CreateUserDto = {
  //       email: 'test@example.com',
  //       password: 'testpassword',
  //     }
  //
  //     jest.spyOn(userService, 'findOne').mockImplementation(() => Promise.resolve(createUserDto))
  //
  //     const result = await controller.findOne(createUserDto)
  //     expect(userService.findOne).toHaveBeenCalledWith(createUserDto.email)
  //     expect(result).toEqual(createUserDto)
  //   })
  // })
})

// import { Test, TestingModule } from '@nestjs/testing'
// import { UserController } from './user.controller'
// import { UserService } from './user.service'
//
// describe('UserController', () => {
//   let controller: UserController
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile()
//
//     controller = module.get<UserController>(UserController)
//   })
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined()
//   })
// })
