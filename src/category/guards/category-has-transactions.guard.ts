import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CategoryService } from '../category.service'

// checking if category has transactions (before being deleted)
@Injectable()
export class CategoryHasTransactionsGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const id = request.params.id

    const category = await this.categoryService.findOne(id)

    const hasTransactions = !!category.transactions.length
    if (hasTransactions)
      throw new BadRequestException('the category cannot be deleted, it has transactions ')

    return true
  }
}
