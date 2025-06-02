import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  nuevaContrasena: string;
}
