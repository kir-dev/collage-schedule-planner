import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class Group {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
