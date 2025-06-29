import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() body:{cpf:string, password:string}){
        return this.authService.signIn(body.cpf,body.password)
    }
}
