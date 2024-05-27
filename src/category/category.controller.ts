import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CustomRequest } from '../types/types'
import { CategoryAccessGuard } from './guards/category-access.guard'
import { CategoryHasTransactionsGuard } from './guards/category-has-transactions.guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: CustomRequest) {
    return await this.categoryService.create(createCategoryDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: CustomRequest) {
    return await this.categoryService.findAll(req.user.id)
  }

  @UseGuards(JwtAuthGuard, CategoryAccessGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard, CategoryAccessGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto)
  }

  @UseGuards(JwtAuthGuard, CategoryAccessGuard, CategoryHasTransactionsGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id)
  }
}
