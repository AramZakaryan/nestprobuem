import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { TransactionController } from './transaction.controller'
import { IUser } from '../types/types'
import { Category } from '../category/entities/category.entity'
import { CategoryService } from '../category/category.service'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: IUser['id']) {
    // // checking if transaction exists
    // const isExist = await this.transactionRepository.findOneBy({
    //   type: createTransactionDto.type,
    //   title: createTransactionDto.title,
    //   category: { id: createTransactionDto.category_id },
    //   user: { id: userId },
    // })
    // if (isExist) throw new BadRequestException('the transaction already exists')

    // // checking if category exists or if authorised user has access to category
    // const category = await this.categoryService.findOne(createTransactionDto.category_id, userId)
    // if (!category) throw new BadRequestException('the category not found')

    const payload = {
      type: createTransactionDto.type,
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      category_id: createTransactionDto.category_id,
      user_id: userId,
    }

    let transaction: any
    try {
      transaction = await this.transactionRepository.save(payload)
    } catch (err) {
      new BadRequestException('something went wrong: transaction not created')
    }

    return { transaction }
  }

  async findAll(userId: IUser['id']) {
    return await this.transactionRepository.find({
      where: { user_id: userId },
      relations: { category: true },
      order: { updated_at: 'DESC' },
    })
  }

  async findAllWithPagination(page: number, limit: number, userId: IUser['id']) {
    // // checking if page and limit are defined
    // if (!page) throw new BadRequestException('page query parameter is undefined')
    // if (!limit) throw new BadRequestException('limit query parameter is undefined')

    return await this.transactionRepository.find({
      where: { user_id: userId },
      relations: { category: true },
      order: { updated_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    })
  }

  async findOne(id: number, userId: IUser['id']) {
    // checking if authorised user has access to transaction
    const transaction = await this.transactionRepository.findOne({
      where: {
        user_id: userId,
        id,
      },
      relations: {
        category: true,
      },
    })
    if (!transaction) throw new BadRequestException('the transaction not found')

    return { transaction }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: IUser['id']) {
    // // checking if transaction exist or if authorised user has access to transaction
    // const transaction = await this.transactionRepository.findOneBy({
    //   user_id: userId,
    //   id,
    // })
    // if (!transaction) throw new BadRequestException('the transaction not found')

    // // checking if category exists or if authorised user has access to category
    // const category = await this.categoryService.findOne(updateTransactionDto.category_id, userId)
    // if (!category) throw new BadRequestException('the category not found')

    const result = await this.transactionRepository.update(
      {
        user_id: userId,
        id,
      },
      {
        type: updateTransactionDto.type,
        title: updateTransactionDto.title,
        amount: updateTransactionDto.amount,
        category_id: updateTransactionDto.category_id,
      },
    )

    return { result }
  }

  async remove(id: number, userId: IUser['id']) {
    // // checking if transaction exists or if authorised user has access to transaction
    // const transaction = await this.transactionRepository.findOneBy({
    //   user_id: userId,
    //   id,
    // })
    // if (!transaction) throw new BadRequestException('the transaction not found')

    const result = await this.transactionRepository.delete({
      id,
    })

    return { result }
  }
}
