import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput
    ): Promise<User> {
        return this.userService.createUser(userData)
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.findUser({ id })
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateUser(@Body() userData: Prisma.UserUpdateInput, @Param('id') id: string): Promise<User | null> {
        return this.userService.updateUser({
            where: { id },
            data: userData
        })
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.deleteUser({ id })
    }

}
