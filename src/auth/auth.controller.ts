import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // redirect google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res): Promise<void> {
    const { user } = req;
    let userId = -1;
    const { user: findUser } = await this.usersService.findByEmail(user.email);
    if (findUser) {
      userId = findUser.id;
    } else {
      const { ok } = await this.usersService.createAccount({
        email: user.email,
        password: 'google-oauth',
        nickname: user.displayName ? user.displayName : user.name,
        photoUrl: user.photo,
      });
      if (ok) {
        const { user: findUser } = await this.usersService.findByEmail(
          user.email,
        );
        if (findUser) {
          userId = findUser.id;
        }
      } else {
        console.log('can not create user');
      }
    }

    const token = this.jwtService.sign(userId);
    res.redirect(
      `${process.env.HAUSLE_FRONT}/google-oauth-success-redirect?token=${token}`,
    );
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(): Promise<void> {
    // redirect github login page
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req, @Res() res): Promise<void> {
    const { user } = req;
    let userId = -1;
    const { user: findUser } = await this.usersService.findByEmail(user.email);
    if (findUser) {
      userId = findUser.id;
    } else {
      const { ok } = await this.usersService.createAccount({
        email: user.email,
        password: 'github-oauth',
        nickname: user.displayName ? user.displayName : user.name,
        photoUrl: user.photo,
      });
      if (ok) {
        const { user: findUser } = await this.usersService.findByEmail(
          user.email,
        );
        if (findUser) {
          userId = findUser.id;
          console.log('create user');
        }
      } else {
        console.log('can not create user');
      }
    }

    const token = this.jwtService.sign(userId);
    res.redirect(
      `${process.env.HAUSLE_FRONT}/github-oauth-success-redirect?token=${token}`,
    );
  }
}
