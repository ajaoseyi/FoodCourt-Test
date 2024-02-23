import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { MealModule } from './meal/meal.module';

@Module({
  imports: [DatabaseModule, MealModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
