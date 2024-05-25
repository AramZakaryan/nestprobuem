import { Test, TestingModule } from '@nestjs/testing'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

describe('CategoryController', () => {
  let controller: CategoryController
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
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

    controller = module.get<CategoryController>(CategoryController)
    service = module.get<CategoryService>(CategoryService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call categoryService.create', async () => {
      const createCategoryDto: CreateCategoryDto = {
        /* populate with sample data */
      }

      await controller.create(createCategoryDto)
      expect(service.create).toHaveBeenCalledWith(createCategoryDto)
    })
  })

  describe('findAll', () => {
    it('should call categoryService.findAll', async () => {
      await controller.findAll()
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should call categoryService.findOne', async () => {
      const id = '1'
      await controller.findOne(id)
      expect(service.findOne).toHaveBeenCalledWith(+id)
    })
  })

  describe('update', () => {
    it('should call categoryService.update', async () => {
      const id = '1'
      const updateCategoryDto: UpdateCategoryDto = {
        /* populate with sample data */
      }

      await controller.update(id, updateCategoryDto)
      expect(service.update).toHaveBeenCalledWith(+id, updateCategoryDto)
    })
  })

  describe('remove', () => {
    it('should call categoryService.remove', async () => {
      const id = '1'
      await controller.remove(id)
      expect(service.remove).toHaveBeenCalledWith(+id)
    })
  })
})

// import { Test, TestingModule } from '@nestjs/testing';
// import { CategoryController } from './category.controller';
// import { CategoryService } from './category.service';
//
// describe('CategoryController', () => {
//   let controller: CategoryController;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CategoryController],
//       providers: [CategoryService],
//     }).compile();
//
//     controller = module.get<CategoryController>(CategoryController);
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
