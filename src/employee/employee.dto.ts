import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
}
export class employeeDto {
  id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  jobrole: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  experience: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role:UserRole;
}
