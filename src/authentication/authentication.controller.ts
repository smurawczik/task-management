import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/create-authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(AuthenticationGuard)
  @Get('verify')
  async verify(@Request() req: any) {
    const user = await this.authService.verifyUser(req.user.user_id);
    if (user) return req.user;

    throw new UnauthorizedException();
  }

  @UseGuards(AuthenticationGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access-token');
    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const auth = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    const date = new Date();
    date.setDate(date.getDate() + 7);
    response.cookie('access-token', auth?.access_token, {
      httpOnly: true,
      expires: date,
    });

    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerData: AuthRegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const auth = await this.authService.register(registerData);

    const date = new Date();
    date.setDate(date.getDate() + 7);
    response.cookie('access-token', auth?.access_token, {
      httpOnly: true,
      expires: date,
    });

    return { success: true };
  }
}
