import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TransactionService } from '../transaction.service'

// checking if authorised user has access to category
@Injectable()
export class TransactionAccessGuard implements CanActivate {
  constructor(private readonly transactionService: TransactionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const id = request.params.id
    const userId = request.user.id

    const transaction = await this.transactionService.findOne(id)

    if (transaction.user_id !== userId)
      throw new BadRequestException('the transaction not found: CustomErrorCode: TAG-01')

    return true
  }
}
