import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { authService } from './auth.service';
import {  employeeDto } from 'src/employee/employee.dto';
import { authLoginDto } from './authDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/roles/authGuard';

@ApiTags('Employee creation and authentication')
@Controller('auth')
export class authController {
  constructor(private readonly authservice: authService) {}

  @ApiOperation({ summary: 'Add employee', description: ' added' })
  @ApiBody({ type: employeeDto, description: 'Enter your data' })
  @ApiResponse({ status: 201, description: 'You are added Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @Post('signup')
  async register(@Body() employeeDto: employeeDto) {
    const usercreate = await this.authservice.createuser(employeeDto);
    if (!usercreate) {
      throw new NotFoundException('user not found');
    }
    return usercreate;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registerd employees',
    description: 'You will be Logged In',
  })
  @ApiBody({ type: authLoginDto, description: 'Enter your data' })
  @ApiResponse({ status: 201, description: 'You are login Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @UseGuards(AuthGuard)
  @Post('signin')
  async signin(    
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const userlogin = await this.authservice.login(username, password);
    return userlogin;
  }
}
