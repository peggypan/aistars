import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateStarDto, UpdateStarDto, GenerateStarDto, ListStarsQuery } from './dto';

@Injectable()
export class StarsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async findAll(query: ListStarsQuery) {
    const { page = 1, pageSize = 20, category, gender, search } = query;
    
    const where: any = {};
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
    });
    if (!star) throw new NotFoundException('演员不存在');
    return star;
  }

  async create(dto: CreateStarDto) {
    return this.prisma.star.create({
      data: {
        ...dto,
        personality: dto.personality ? JSON.stringify(dto.personality) : null,
        skills: dto.skills ? JSON.stringify(dto.skills) : null,
        categories: dto.categoryIds ? JSON.stringify(dto.categoryIds) : null,
        aiGenerated: false,
      },
    });
  }

  // 风格和性格预设的中文映射
  private stylePresetMap: Record<string, string> = {
    elegant: '优雅',
    street: '街头',
    vintage: '复古',
    casual: '休闲',
    business: '商务',
    sporty: '运动',
    bohemian: '波西米亚',
    minimalist: '极简',
  };

  private personalityPresetMap: Record<string, string> = {
    calm: '冷静',
    energetic: '活泼',
    rational: '理性',
    emotional: '感性',
    confident: '自信',
    shy: '害羞',
    humorous: '幽默',
    serious: '严肃',
    optimistic: '乐观',
    pessimistic: '悲观',
  };

  async generate(dto: GenerateStarDto) {
    // 构建AI提示词，包含预设的风格和性格
    let enhancedPrompt = dto.prompt || '';
    
    if (dto.stylePreset) {
      const styleName = this.stylePresetMap[dto.stylePreset] || dto.stylePreset;
      enhancedPrompt += `\n风格：${styleName}风格`;
    }
    
    if (dto.personalityPreset) {
      const personalityName = this.personalityPresetMap[dto.personalityPreset] || dto.personalityPreset;
      enhancedPrompt += `\n性格：${personalityName}`;
    }

    // 调用AI服务生成演员档案
    const aiProfile = await this.aiService.generateStarProfile(enhancedPrompt);
    
    // 构建演员数据
    const starData = {
      name: aiProfile.name || this.generateRandomName(),
      age: aiProfile.age || this.randomAge(dto.ageRange),
      gender: aiProfile.gender || dto.gender || 'other',
      nationality: aiProfile.nationality || '中国',
      personality: JSON.stringify(aiProfile.personality || [this.personalityPresetMap[dto.personalityPreset] || '开朗']),
      personalityPreset: dto.personalityPreset || null,
      background: aiProfile.background || '暂无背景故事',
      skills: JSON.stringify(aiProfile.skills || ['表演']),
      appearance: aiProfile.appearance || '外貌出众',
      style: aiProfile.style || (dto.stylePreset ? this.stylePresetMap[dto.stylePreset] : '时尚'),
      stylePreset: dto.stylePreset || null,
      signature: aiProfile.signature || '',
      categories: dto.categoryIds ? JSON.stringify(dto.categoryIds) : null,
      aiGenerated: true,
      aiPrompt: enhancedPrompt,
    };

    // 创建演员记录
    const star = await this.prisma.star.create({ data: starData });

    return {
      success: true,
      message: 'AI演员生成成功',
      data: star,
    };
  }

  private generateRandomName(): string {
    const surnames = ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
    const names = ['子轩', '梓涵', '雨桐', '浩然', '诗琪', '俊杰', '思颖', '博文', '雅婷', '睿渊'];
    return surnames[Math.floor(Math.random() * surnames.length)] + 
           names[Math.floor(Math.random() * names.length)];
  }

  private randomAge(range?: [number, number]): number {
    const min = range?.[0] || 18;
    const max = range?.[1] || 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async update(id: string, dto: UpdateStarDto) {
    await this.findOne(id);
    return this.prisma.star.update({
      where: { id },
      data: {
        ...dto,
        personality: dto.personality ? JSON.stringify(dto.personality) : undefined,
        skills: dto.skills ? JSON.stringify(dto.skills) : undefined,
        categories: dto.categoryIds ? JSON.stringify(dto.categoryIds) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.star.delete({ where: { id } });
    return { success: true };
  }

  async exportForFilmStudio(id: string) {
    const star = await this.findOne(id);
    const personality = star.personality ? JSON.parse(star.personality) : [];
    const skills = star.skills ? JSON.parse(star.skills) : [];
    
    return {
      id: star.id,
      name: star.name,
      avatar: star.avatar,
      type: 'actor',
      bio: `${star.age}岁${star.nationality}演员。${star.background?.slice(0, 100)}...`,
      skills,
      aiStarId: star.id,
      aiGenerated: star.aiGenerated,
      metadata: {
        personality,
        appearance: star.appearance,
        age: star.age,
        gender: star.gender,
      },
    };
  }
}