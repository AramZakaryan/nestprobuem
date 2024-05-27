import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CategoryService } from '../category.service'
import { TransactionService } from '../../transaction/transaction.service'

// checking if authorised user has access to category
@Injectable()
export class CategoryAccessGuard implements CanActivate {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly transactionService: TransactionService, // this is not necessary here - experiment to avoid circular dependency
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const id = request.params.id
    const userId = request.user.id

    const { category } = await this.categoryService.findOne(id)

    if (category.user_id !== userId)
      throw new BadRequestException('the category not found: CustomErrorCode: CAG-01')

    return true
  }
}
