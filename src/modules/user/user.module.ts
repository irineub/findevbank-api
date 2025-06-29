import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [DatabaseModule, forwardRef(() => AuthModule)]
})
export class UserModule { }
