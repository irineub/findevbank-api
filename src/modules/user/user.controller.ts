import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput
    ): Promise<User> {
        return this.userService.createUser(userData)
    }
}
