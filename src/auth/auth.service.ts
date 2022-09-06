import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne({ where : {email: email} });

    if (user) {
      let hash = user.password;
      hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
      const match = await bcrypt.compare(pass, hash);

      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      userId: user.id,
      email: user.email,
      roleId: user.role_id,
      hr: user.hr
    };

    const roleId = user.role_id;
    const jwt = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      algorithm: 'HS256'
    });
    
    return { roleId, jwt };
  }
}