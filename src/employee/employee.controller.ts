import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserRole, employeeDto } from './employee.dto';
import { employeeservice } from './employee.service';
import { employee } from './employee.schema';
import mongoose from 'mongoose';
import { UserRoles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/roles/authGuard';
import { RoleGuard } from 'src/roles/role.guard';

@UseGuards(AuthGuard,RoleGuard)
@Controller('employee')
export class employeeController {
  constructor(private readonly employeeService: employeeservice) {}

  @UserRoles(UserRole.ADMIN,UserRole.MANAGER,UserRole.DEVELOPER)
  @Get()
  async getAllemployee(): Promise<employee[]> {
    const emp2 = await this.employeeService.findEmployee();
    return emp2;
  }

  @UserRoles(UserRole.DEVELOPER,UserRole.ADMIN)
  @Get(':id')
  async getEmployeeById(@Param('id') id: mongoose.Types.ObjectId) {
    try {
      const emp3 = await this.employeeService.findEmployeeById(id);
      return emp3;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UserRoles(UserRole.ADMIN,UserRole.MANAGER)
  @Put(':id')
  async updateEmp(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() employeeDto: employeeDto,
  ) {
    try {
      const emp4 = await this.employeeService.updateEmployee(id, employeeDto);
      return emp4;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UserRoles(UserRole.ADMIN)
  @Delete(':id')
  async deleteEmp(
    @Param('id') id: mongoose.Types.ObjectId
  ) {
    try {
      const emp5 = await this.employeeService.deleteEmployee(id,);
      return emp5;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
