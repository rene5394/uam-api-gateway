import { Controller, Request, Response, Post, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    const origin = req.headers.origin;
    const corsOrigins = process.env.CORS_DOMAIN.split(' ');
    const { roleId, jwt } = await this.authService.login(req.user);

    if (!corsOrigins.includes(origin)) {
      throw new UnauthorizedException();
    }

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.cookie('timeoff-auth-cookie', jwt, { httpOnly: true });
    res.status(200).send({roleId: roleId});
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req, @Response() res) {
    if (req.cookies['timeoff-auth-cookie']) {
      res.clearCookie('timeoff-auth-cookie', { httpOnly: true });
      res.status(200).send();
    }

    res.status(400).send();
  }
}
