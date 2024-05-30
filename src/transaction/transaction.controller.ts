import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CustomRequest } from '../types/types'
import { TransactionAccessGuard } from './guards/transaction-access.guard'
import { CategoryAccessGuard } from '../category/guards/category-access.guard'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard, CategoryAccessGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: CustomRequest) {
    return await this.transactionService.create(createTransactionDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() req: CustomRequest,
    @Query('type') type: 'income' | 'expense',
    @Query('title') title: string,
    @Query('amount') amount: number,
    @Query('category_id') category_id: number,
  ) {
    return await this.transactionService.findAll(req.user.id, type, title, amount, category_id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('sum')
  async findSum(
    @Req() req: CustomRequest,
    @Query('type') type: 'income' | 'expense',
    @Query('title') title: string,
    @Query('category_id') category_id: number,
  ) {
    return await this.transactionService.findSum(req.user.id, type, title, category_id)
  }

  @UseGuards(JwtAuthGuard, TransactionAccessGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('pagination')
  async findAllWithPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: CustomRequest,
  ) {
    return await this.transactionService.findAllWithPagination(page, limit, req.user.id)
  }

  @UseGuards(JwtAuthGuard, TransactionAccessGuard, CategoryAccessGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: CustomRequest,
  ) {
    return await this.transactionService.update(+id, updateTransactionDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard, TransactionAccessGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.transactionService.remove(+id, req.user.id)
  }
}
