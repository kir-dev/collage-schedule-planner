import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class User {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  authSchId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  profilePicture: string;
}
