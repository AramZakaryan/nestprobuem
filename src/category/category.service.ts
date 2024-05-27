import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'
import { IUser } from '../types/types'
import { CategoryAccessGuard } from './guards/category-access.guard'
import { TransactionService } from '../transaction/transaction.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: IUser['id']) {
    const isExist = await this.categoryRepository.findOneBy({
      user: { id: userId },
      title: createCategoryDto.title,
    })
    if (isExist) throw new BadRequestException('the category already exists')

    const payload = {
      title: createCategoryDto.title,
      user_id: userId,
    }
    let category: Category
    try {
      category = await this.categoryRepository.save(payload)
    } catch (err) {
      new BadRequestException('something went wrong: category not created')
    }

    return { category }
  }

  async findAll(userId: IUser['id']) {
    return await this.categoryRepository.find({
      where: { user_id: userId },
      relations: { transactions: true },
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { transactions: true }, // is necessary for CategoryHasTransactionsGuard
    })
    if (!category)
      throw new BadRequestException('the category not found: CustomErrorCode: CS-FO-01')
    return { category }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update({ id }, { title: updateCategoryDto.title })
  }

  async remove(id: number) {
    return await this.categoryRepository.delete({ id })
  }
}
