import { Module } from '@nestjs/common';
import { StarsController } from './stars.controller';
import { StarsService } from './stars.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [StarsController],
  providers: [StarsService],
})
export class StarsModule {}