import { Test, TestingModule } from '@nestjs/testing'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

describe('TransactionController', () => {
  let controller: TransactionController
  let service: TransactionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<TransactionController>(TransactionController)
    service = module.get<TransactionService>(TransactionService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call transactionService.create', async () => {
      const createTransactionDto: CreateTransactionDto = {
        /* populate with sample data */
      }

      await controller.create(createTransactionDto)
      expect(service.create).toHaveBeenCalledWith(createTransactionDto)
    })
  })

  describe('findAll', () => {
    it('should call transactionService.findAll', async () => {
      await controller.findAll()
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should call transactionService.findOne', async () => {
      const id = '1'
      await controller.findOne(id)
      expect(service.findOne).toHaveBeenCalledWith(+id)
    })
  })

  describe('update', () => {
    it('should call transactionService.update', async () => {
      const id = '1'
      const updateTransactionDto: UpdateTransactionDto = {
        /* populate with sample data */
      }

      await controller.update(id, updateTransactionDto)
      expect(service.update).toHaveBeenCalledWith(+id, updateTransactionDto)
    })
  })

  describe('remove', () => {
    it('should call transactionService.remove', async () => {
      const id = '1'
      await controller.remove(id)
      expect(service.remove).toHaveBeenCalledWith(+id)
    })
  })
})

// import { Test, TestingModule } from '@nestjs/testing'
// import { TransactionController } from './transaction.controller'
// import { TransactionService } from './transaction.service'
//
// describe('TransactionController', () => {
//   let controller: TransactionController;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TransactionController],
//       providers: [TransactionService],
//     }).compile();
//
//     controller = module.get<TransactionController>(TransactionController);
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
