import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStarDto, UpdateStarDto, GenerateStarDto, ListStarsQuery } from './dto';

@Injectable()
export class StarsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ListStarsQuery) {
    const { page = 1, pageSize = 20, category, gender, search } = query;
    
    const where: any = {};
    if (category) where.categories = { has: category };
    if (gender) where.gender = gender;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { background: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.star.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { categories: true },
      }),
      this.prisma.star.count({ where }),
    ]);

    return {
      data,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async findOne(id: string) {
    const star = await this.prisma.star.findUnique({
      where: { id },
      include: { categories: true, movies: { include: { movie: true } } },
    });
    if (!star) throw new NotFoundException('演员不存在');
    return star;
  }

  async create(dto: CreateStarDto) {
    return this.prisma.star.create({
      data: {
        ...dto,
        aiGenerated: false,
      },
      include: { categories: true },
    });
  }

  async generate(dto: GenerateStarDto) {
    // TODO: 调用OpenAI生成演员档案
    throw new Error('AI生成功能待实现');
  }

  async update(id: string, dto: UpdateStarDto) {
    await this.findOne(id);
    return this.prisma.star.update({
      where: { id },
      data: dto,
      include: { categories: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.star.delete({ where: { id } });
    return { success: true };
  }

  async exportForFilmStudio(id: string) {
    const star = await this.findOne(id);
    return {
      id: star.id,
      name: star.name,
      avatar: star.avatar,
      type: 'actor',
      bio: `${star.age}岁${star.nationality}演员。${star.background?.slice(0, 100)}...`,
      skills: star.skills,
      aiStarId: star.id,
      aiGenerated: star.aiGenerated,
      metadata: {
        personality: star.personality,
        appearance: star.appearance,
        age: star.age,
        gender: star.gender,
      },
    };
  }
}