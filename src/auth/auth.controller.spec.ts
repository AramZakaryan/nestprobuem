import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { LocalAuthGuard } from './guards/local-auth.guard'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    it('should return the user object', async () => {
      const mockUser = { username: 'testuser', password: 'testpassword' }
      const mockRequest = { user: mockUser }

      jest.spyOn(LocalAuthGuard.prototype, 'canActivate').mockImplementation(() => true)

      const result = await controller.login(mockRequest)
      expect(result).toBe(mockUser)
    })
  })
})

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
//
// describe('AuthController', () => {
//   let controller: AuthController;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [AuthService],
//     }).compile();
//
//     controller = module.get<AuthController>(AuthController);
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
