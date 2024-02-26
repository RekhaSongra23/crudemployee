import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { authService } from "./auth.service";
import { UserRole, employeeDto } from "src/employee/employee.dto";
import { authLoginDto } from "./authDto";


@Controller('auth')


export class authController{
    constructor(private readonly authservice:authService){}
   @Post('signup')
    async register(@Body() employeeDto:employeeDto){
        const usercreate=await this.authservice.createEmployee(employeeDto)
        if(!usercreate){
            throw new NotFoundException('user not found')
        }
        return usercreate
    }
   @Post('signin')
    async signin(@Body() authLogin:authLoginDto, username:string,password:string,){
        const userlogin=await this.authservice.login( authLogin.username, authLogin.password );
        return userlogin;


    }
    
}