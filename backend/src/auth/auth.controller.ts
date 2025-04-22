import { Controller, Post, Body,Get,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto,SignupDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}
@Controller('user')
export class UserController {
  @UseGuards(AuthGuard("jwt"))
  @Get('profile')
  getProfile() {
    return { message: 'User Authenticated' };
  }
}
