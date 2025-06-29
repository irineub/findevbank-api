import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY || "",
    signOptions: { expiresIn: '1H' }
  })],
  exports: [AuthGuard]
})
export class AuthModule { }
