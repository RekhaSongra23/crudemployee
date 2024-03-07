import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole, employeeDto } from './employee.dto';
import { employeeservice } from './employee.service';
import { employee } from './employee.schema';
import mongoose from 'mongoose';
import { UserRoles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/roles/authGuard';
import { RoleGuard } from 'src/roles/role.guard';
import { employeeUpdateDto, updatepassDto } from './employeeUpdateDto';

@UseGuards(AuthGuard, RoleGuard)
@UserRoles(UserRole.ADMIN, UserRole.MANAGER)
@ApiBearerAuth()
@ApiTags('Employee Retrival and Updation')
@Controller('employee')
export class employeeController {
  constructor(private readonly employeeService: employeeservice) {}

  @ApiOperation({
    summary: 'Get All Employee ',
    description: 'You will get All employess',
  })
  @ApiResponse({ status: 200, description: 'Employee Get successfully' })
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
  @Get(':id')
  async getEmployeeById(
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req: any,
  ) {
    try {
      const authenticatedUser = req.user;
      if (
        authenticatedUser.sub.toString() === id.toString() ||
        authenticatedUser.role === UserRole.ADMIN ||
        authenticatedUser.role === UserRole.MANAGER
      ) {
        const emp3 = await this.employeeService.findEmployeeById(id);
        return emp3;
      } else {
        throw new ForbiddenException('You are not authorized');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({
    summary: 'Update employee id',
    description: 'Enter id and update data',
  })
  @ApiParam({ name: 'id', description: 'employee id', type: String })
  @ApiBody({ type: employeeDto, description: 'Update data' })
  @ApiResponse({ status: 200, description: 'Employee is getting sucessfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  // @UserRoles(UserRole.ADMIN, UserRole.MANAGER)
  @Put(':id')
  async updateEmp(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() employeeUpdateDto: employeeUpdateDto,
    @Request() req: any,
  ) {
    const authenticatedUser = req.user;
    try {
      if (
        authenticatedUser.sub.toString() === id.toString() ||
        authenticatedUser.role === UserRole.ADMIN ||
        authenticatedUser.role === UserRole.MANAGER
      ) {
        const emp4 = await this.employeeService.updateEmployee(
          id,
          employeeUpdateDto,
        );
        return emp4;
      } else {
        throw new ForbiddenException('You are not authorized');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @ApiOperation({
    summary: 'Update user password',
    description: 'You can update your data',
  })
  @ApiParam({ name: 'id', description: 'emp ID', type: String })
  @ApiBody({ type: employeeUpdateDto, description: 'Update your data' })
  @ApiResponse({
    status: 200,
    description: 'User password is updated successfully',
  })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @Put(':id/password')
  async updateUserPasswordById(
    @Param('id') userId: mongoose.Types.ObjectId,
    @Body() updatepassDto: updatepassDto,
  ) {
    try {
      const existsUser = await this.employeeService.updatePassword(
        userId,
        updatepassDto,
      );
      return existsUser;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @ApiOperation({
    summary: 'Delete Employee',
    description: 'Enter id and delete',
  })
  @ApiParam({ name: 'id', description: 'employee id', type: String })
  @ApiResponse({ status: 200, description: 'employee is deleting sucessfully'})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // @UserRoles(UserRole.ADMIN)
  @Delete(':id')
  async deleteEmp(
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req: any,
  ) {
    const authenticatedUser = req.user;
    try {
      if (
        authenticatedUser.sub.toString() === id.toString() ||
        authenticatedUser.role === UserRole.ADMIN ||
        authenticatedUser.role === UserRole.MANAGER
      ) {
        const emp5 = await this.employeeService.deleteEmployee(id);
        return { message: `User with this Id: ${id} deleted successfully` };
      } else {
        throw new ForbiddenException('You are not authorized');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
