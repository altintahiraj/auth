import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/DTO/User.dto';
import { LoginDto } from 'src/user/DTO/login.dto';
import { UserEntity } from 'src/user/Entity/User.entity';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private readonly userService: UserService) { }

    public async register(body: UserDto): Promise<{ user: UserEntity, token: string }> {
        try {
            const checkUser = await this.userService.findByEmail(body.email);
            if (checkUser) {
                throw new ErrorHandler("You are already registered", HttpStatus.FOUND);
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);
            const userData = {
                name: body.name,
                lastname: body.lastname,
                email: body.email,
                password: hashedPassword,
                role: 'user',
            };
            const user = await this.userService.registerUser(userData);

            const token = await this.jwtService.signAsync({ id: user.id });
            return { user, token };
        } catch (error) {
            throw new ErrorHandler(error.response, error.status);
        }
    }


    public async loginUser(body: LoginDto): Promise<{ user: UserEntity, token: string }> {
        try {
            const user = await this.userService.findByEmail(body.email);
            if (!user) {
                throw new ErrorHandler("user with this email was not found", HttpStatus.NOT_FOUND)
            }
            const password = await bcrypt.compare(body.password, user?.password)
            if (!password) {
                throw new ErrorHandler("your password is incorrect", HttpStatus.NOT_FOUND)
            }
            const token = await this.jwtService.signAsync({ id: user.id });
            return { user, token };
        } catch (error) {
            throw new ErrorHandler(error.response, error.status);
        }
    }
}
