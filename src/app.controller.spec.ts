import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn(),
          },
        },
      ],
    }).compile()

    appController = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })

  describe('getHello', () => {
    it('should call the appService.getHello method and return the result', async () => {
      const helloMessage = 'Hello, World!'
      jest.spyOn(appService, 'getHello').mockImplementation(() => helloMessage)

      const result = await appController.getHello()
      expect(appService.getHello).toHaveBeenCalled()
      expect(result).toEqual(helloMessage)
    })
  })
})

// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
//
// describe('AppController', () => {
//   let appController: AppController;
//
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();
//
//     appController = app.get<AppController>(AppController);
//   });
//
//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
