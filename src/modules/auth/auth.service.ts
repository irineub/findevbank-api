import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;
    @Inject()
    private readonly jwtService: JwtService

    async signIn(cpf: string, userPasssword: string): Promise<{ access_token: string }> {
        const user = await this.userService.findUser({ cpf: cpf })
        if (!user) throw new NotFoundException('User not Found')
        const passwordMatch = await bcrypt.compare(userPasssword, user.password)
        if (!passwordMatch) throw new UnauthorizedException('Invalid Credentials')
        const { password, ...result } = user

        const payload = { sub: user.id }
        return { access_token: await this.jwtService.signAsync(payload) }
    }

}
