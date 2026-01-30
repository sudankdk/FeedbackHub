import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { RegisterUserDto } from './dto/registeruser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    findById(id:number):Promise<User | null>{
        return this.userRepository.findOneBy({id});
    }

    createUser(@Body() dto:RegisterUserDto): Promise<User>{
        const newUser = this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }
}
