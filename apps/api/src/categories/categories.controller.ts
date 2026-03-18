import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return { data };
  }

  @Post()
  create(@Body() dto: any) {
    return this.categoriesService.create(dto);
  }
}