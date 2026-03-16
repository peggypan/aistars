import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { StarsService } from './stars.service';
import { CreateStarDto, UpdateStarDto, GenerateStarDto, ListStarsQuery } from './dto';

@ApiTags('stars')
@Controller('stars')
export class StarsController {
  constructor(private readonly starsService: StarsService) {}

  @Get()
  @ApiOperation({ summary: '获取演员列表' })
  findAll(@Query() query: ListStarsQuery) {
    return this.starsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取演员详情' })
  @ApiParam({ name: 'id', description: '演员ID' })
  findOne(@Param('id') id: string) {
    return this.starsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '创建演员' })
  create(@Body() dto: CreateStarDto) {
    return this.starsService.create(dto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'AI生成演员' })
  generate(@Body() dto: GenerateStarDto) {
    return this.starsService.generate(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新演员' })
  update(@Param('id') id: string, @Body() dto: UpdateStarDto) {
    return this.starsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除演员' })
  remove(@Param('id') id: string) {
    return this.starsService.remove(id);
  }

  @Get(':id/export')
  @ApiOperation({ summary: '导出演员到FilmStudio' })
  exportForFilmStudio(@Param('id') id: string) {
    return this.starsService.exportForFilmStudio(id);
  }
}