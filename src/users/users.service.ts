import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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

    findByEmail(email:string):Promise<User | null>{
        return this.userRepository.findOneBy({email});
    }

    createUser(dto:RegisterUserDto): Promise<User>{
        const newUser = this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }

    async duplicateEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ email });
        return user !== null;
    }
}
