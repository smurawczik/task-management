import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/create-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async verifyUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;

    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    // we want to avoid sending password as the token payload
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    const payload = { ...rest };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerData: AuthRegisterDto) {
    const { email, password, repeatedPassword, firstName, lastName, role } =
      registerData;
    if (
      !email ||
      !password ||
      !repeatedPassword ||
      !firstName ||
      !lastName ||
      !role
    )
      throw new HttpException('Missing data', 400);
    if (password !== repeatedPassword)
      throw new HttpException('Passwords do not match', 400);

    try {
      const user = this.usersRepository.create({
        email,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName,
        roles: role,
      });

      await this.usersRepository.save(user);
      // we want to avoid sending password as the token payload
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...rest } = user;
      const payload = { ...rest };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error?.code, 500);
    }
  }
}
