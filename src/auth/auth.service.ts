import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/registeruser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly usersService : UsersService, private readonly jwtService: JwtService) {}

    async signUp(createUserDto : RegisterUserDto) {
        const salt = 10

        if (await this.usersService.duplicateEmail(createUserDto.email)) {
            throw new Error('Email already in use');
        }
        const hash = bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = await hash;
        const user = await  this.usersService.createUser(createUserDto);
        return user;
    }

    async Signin(email:string, password:string):Promise<{token:string}>{
        const user = await this.usersService.findByEmail(email);
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException()
        }
        const payload= {sub: user.id, username: user.username, role: user.role};
        return{
            token : await this.jwtService.signAsync(payload)
        }
    }

    async getUser(id:string){
        return await this.usersService.findById(parseInt(id));
    }


}
