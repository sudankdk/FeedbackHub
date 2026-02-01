import { Body, Controller, Get, HttpCode, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(201)
    @Post('signup')
    async signUp(@Body() createUserDto) {
        const user = await this.authService.signUp(createUserDto);
        return {
            username: user.username,
            email: user.email,
            role: user.role,
        }
    }

    @HttpCode(200)
    @Post('signin')
    async signIn(@Body() body) {
        const { email, password } = body;
        return  await this.authService.Signin(email, password);   
    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get('profile')
    getProfile(@Request() req){
       const user= this.authService.getUser(req.user.sub)
       return {
        "id": user['id'],
        "username": user['username'],
        "email": user['email'],
        "role": user['role']
       }
    }
    


}
