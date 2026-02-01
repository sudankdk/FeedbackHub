import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>,private readonly userService : UsersService){}

  async create(createTaskDto: CreateTaskDto, userID : number,file?: Express.Multer.File) {
    const user = await this.userService.findById(userID);
     if (!user) {
      throw new NotFoundException('User not found');
    }
    let attachementUrl: string | undefined = undefined;
    if(file){
      attachementUrl = `/uploads/${file.originalname}`;
      createTaskDto.attachementUrl = attachementUrl;
    }

    const task =  this.taskRepository.create({...createTaskDto,user,attachementUrl});
    await this.taskRepository.save(task);
    return {message:'Task created successfully'};
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
