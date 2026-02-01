import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UsersModule } from 'src/users/users.module';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
