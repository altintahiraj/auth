import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/Entity/User.entity';
import { UserDto } from 'src/user/DTO/User.dto';
import { LoginDto } from 'src/user/DTO/login.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('register')
    public async register(@Body() body: UserDto, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
        const { user, token } = await this.authService.register(body);
        response.cookie('jwt', token, { httpOnly: true });
        return user;
    }

    @Post('login')
    public async login(@Body() bodyParam: LoginDto, @Res({ passthrough: true }) response: Response) {
        const { user, token } = await this.authService.loginUser(bodyParam);
        response.cookie('jwt', token, { httpOnly: true });
        return user;
    }

    @Post('logout')
    public logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { "message": "success", "status": 201 };
    }
}