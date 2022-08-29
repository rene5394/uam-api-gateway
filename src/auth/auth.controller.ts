import { Controller, Request, Response, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    let token = await this.authService.login(req.user);
    
    res.cookie('timeoff-auth-cookie', token, { httpOnly: true });
    res.status(200).send();
  }
}
