import { IsNotEmpty, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateTransactionDto {
  @IsNotEmpty()
  type: 'income' | 'expense'
  @IsNotEmpty()
  title: string
  @Type(() => Number)
  @IsNumber()
  amount: number
  @Type(() => Number)
  @IsNumber()
  category_id: number
}
