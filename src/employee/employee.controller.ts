import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole, employeeDto } from './employee.dto';
import { employeeservice } from './employee.service';
import { employee } from './employee.schema';
import mongoose from 'mongoose';
import { UserRoles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/roles/authGuard';
import { RoleGuard } from 'src/roles/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
@ApiTags('Employee Retrival and Updation')
@Controller('employee')
export class employeeController {
  constructor(private readonly employeeService: employeeservice) {}

  @ApiOperation({
    summary: 'Get All Employee ',
    description: 'You will get All employess',
  })
  @ApiResponse({ status: 200, description: 'Employee Get sucessfully' })
  @UserRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER)
  @Get()
  async getAllemployee(): Promise<employee[]> {
    const emp2 = await this.employeeService.findEmployee();
    return emp2;
  }

  @ApiOperation({
    summary: 'Get Employee by Id',
    description: 'Enter id and get data',
  })
  @ApiParam({ name: 'id', description: 'Employee Id', type: String })
  @ApiResponse({ status: 200, description: 'Employee is getting sucessfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UserRoles(UserRole.DEVELOPER, UserRole.ADMIN)
  @Get(':id')
  async getEmployeeById(@Param('id') id: mongoose.Types.ObjectId) {
    try {
      const emp3 = await this.employeeService.findEmployeeById(id);
      return emp3;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({
    summary: 'Update employee id',
    description: 'Enter id and update data',
  })
  @ApiParam({ name: 'id', description: 'employee id', type: String })
  @ApiBody({ type: employeeDto, description: 'Update Data' })
  @ApiResponse({ status: 200, description: 'Employee is updated sucessfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UserRoles(UserRole.ADMIN, UserRole.MANAGER)
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
  @ApiOperation({
    summary: 'Deleet employee',
    description: 'Enter id and delete',
  })
  @ApiParam({ name: 'id', description: 'employee id', type: String })
  @ApiResponse({ status: 200, description: 'employee is deleted sucessfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UserRoles(UserRole.ADMIN)
  @Delete(':id')
  async deleteEmp(@Param('id') id: mongoose.Types.ObjectId) {
    try {
      const emp5 = await this.employeeService.deleteEmployee(id);
      return emp5;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
