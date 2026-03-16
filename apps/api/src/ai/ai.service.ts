import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateStarProfile(prompt: string) {
    // TODO: 实现AI生成演员档案
    const systemPrompt = `你是一个专业的演员档案生成专家。
根据用户的需求，生成一个完整的虚拟演员档案。
返回JSON格式，包含：姓名、年龄、性别、国籍、性格、背景故事、特长、外貌描述。`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  }
}