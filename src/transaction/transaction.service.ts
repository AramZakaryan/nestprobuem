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

    return transaction
  }

  async findAll(
    userId: IUser['id'],
    type?: 'income' | 'expense',
    title?: string,
    amount?: number,
    category_id?: number,
  ) {
    return await this.transactionRepository.find({
      where: {
        user_id: userId,
        type,
        title,
        amount,
        category_id,
      },
      relations: { category: true },
      order: { updated_at: 'DESC' },
    })
  }

  async findSum(
    userId: IUser['id'],
    type?: 'income' | 'expense',
    title?: string,
    category_id?: number,
  ) {
    const transactions = await this.transactionRepository.find({
      where: {
        user_id: userId,
        type,
        title,
        category_id,
      },
    })
    return transactions.reduce((acc, t) => acc + t.amount, 0)
  }

  async findAllWithPagination(page: number, limit: number, userId: IUser['id']) {
    // checking if page and limit are defined
    if (!page) throw new BadRequestException('page query parameter is undefined')
    if (!limit) throw new BadRequestException('limit query parameter is undefined')

    return await this.transactionRepository.find({
      where: { user_id: userId },
      relations: { category: true },
      order: { updated_at: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    })
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: { category: true },
    })
    if (!transaction)
      throw new BadRequestException('the transaction not found: CustomErrorCode: TS-FO-01')
    return transaction
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: IUser['id']) {
    return await this.transactionRepository.update(
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
  }

  async remove(id: number, userId: IUser['id']) {
    return await this.transactionRepository.delete({ id })
  }
}
