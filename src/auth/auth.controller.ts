import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // redirect google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res): Promise<void> {
    const { user } = req;
    console.log(user);

    // TODO: 이미 있는 유저인지 판단 아니면 등록

    // TODO: jwt token 발행

    res.redirect(`${process.env.HAUSLE_FRONT}/google-oauth-success-redirect`);
  }
}
