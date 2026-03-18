// 风格预选选项
export type StylePreset = 'elegant' | 'street' | 'vintage' | 'casual' | 'business' | 'sporty' | 'bohemian' | 'minimalist';

// 性格预选选项
export type PersonalityPreset = 'calm' | 'energetic' | 'rational' | 'emotional' | 'confident' | 'shy' | 'humorous' | 'serious' | 'optimistic' | 'pessimistic';

export class CreateStarDto {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  personality?: string[];
  personalityPreset?: PersonalityPreset;
  background?: string;
  skills?: string[];
  appearance?: string;
  style?: string;
  stylePreset?: StylePreset;
  signature?: string;
  categoryIds?: string[];
}

export class UpdateStarDto {
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  personality?: string[];
  personalityPreset?: PersonalityPreset;
  background?: string;
  skills?: string[];
  appearance?: string;
  style?: string;
  stylePreset?: StylePreset;
  signature?: string;
  categoryIds?: string[];
}

export class GenerateStarDto {
  prompt?: string;
  categoryIds?: string[];
  ageRange?: [number, number];
  gender?: 'male' | 'female' | 'other';
  stylePreset?: StylePreset;
  personalityPreset?: PersonalityPreset;
}

export class ListStarsQuery {
  page?: number;
  pageSize?: number;
  category?: string;
  gender?: 'male' | 'female' | 'other';
  search?: string;
}