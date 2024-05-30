import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CategoryService } from '../category.service'

// checking if authorised user has access to category
@Injectable()
export class CategoryAccessGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    let id: number

    // checking if guard is implemented in TransactionController
    if (request.route.path.includes('/api/transaction', 0)) {
      if (request.body.category_id) {
        id = request.body.category_id // case where guard is in TransactionController and category_id defined in body
      } else {
        return true // case where guard is in TransactionController and category_id undefined in body
      }
    } else {
      id = request.params.id // case where guard is not in TransactionController
    }

    const userId = request.user.id

    const category = await this.categoryService.findOne(id)

    if (category.user_id !== userId)
      throw new BadRequestException('the category not found: CustomErrorCode: CAG-01')

    return true
  }
}
