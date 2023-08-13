import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserRoles } from 'src/roles/entities/role.entity';

export class CreateAuthenticationDto {}

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @Length(8, 20)
  @IsNotEmpty()
  password: string;

  @Length(8, 20)
  @IsNotEmpty()
  repeatedPassword: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  role: UserRoles[];
}

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
