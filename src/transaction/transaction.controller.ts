import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CustomRequest } from '../types/types'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: CustomRequest) {
    return await this.transactionService.create(createTransactionDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: CustomRequest) {
    return await this.transactionService.findAll(req.user.id)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.transactionService.findOne(+id, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: CustomRequest,
  ) {
    return await this.transactionService.update(+id, updateTransactionDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    return await this.transactionService.remove(+id, req.user.id)
  }
}
