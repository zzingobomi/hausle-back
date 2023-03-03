import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_REDIRECT,
      scope: ['user'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, displayName, username, emails, photos } = profile;

    return {
      provider: 'github',
      provicderId: id,
      displayName,
      name: username,
      email: emails[0].value,
      photo: photos[0].value,
    };
  }
}
