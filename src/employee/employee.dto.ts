import { Prop } from "@nestjs/mongoose";
import { IsEnum, IsNotEmpty, isNotEmpty } from "class-validator";

export enum UserRole{
    ADMIN="ADMIN",
    MANAGER="MANAGER",
    DEVELOPER="DEVELOPER"
}
export class employeeDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  jobrole: string;

  @IsNotEmpty()
  experience: string;

  @IsEnum(UserRole)
  role: UserRole;
}