import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[DatabaseModule]
})
export class UserModule {}
