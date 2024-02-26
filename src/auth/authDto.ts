import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEVELOPER = 'developer',
}
export class authLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}
