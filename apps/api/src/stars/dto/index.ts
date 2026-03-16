export class CreateStarDto {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  personality?: string[];
  background?: string;
  skills?: string[];
  appearance?: string;
  style?: string;
  signature?: string;
  categoryIds?: string[];
}

export class UpdateStarDto {
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  personality?: string[];
  background?: string;
  skills?: string[];
  appearance?: string;
  style?: string;
  signature?: string;
  categoryIds?: string[];
}

export class GenerateStarDto {
  prompt: string;
  categoryIds?: string[];
  ageRange?: [number, number];
  gender?: 'male' | 'female' | 'other';
}

export class ListStarsQuery {
  page?: number = 1;
  pageSize?: number = 20;
  category?: string;
  gender?: 'male' | 'female' | 'other';
  search?: string;
}