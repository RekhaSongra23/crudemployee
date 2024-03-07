import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { employee } from './employee.schema';
import mongoose from 'mongoose';
import { employeeUpdateDto, updatepassDto } from './employeeUpdateDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class employeeservice {
  constructor(
    @InjectModel(employee.name)
    private readonly employeemodel: mongoose.Model<employee>,
  ) {}

  async findEmployee(): Promise<employee[]> {
    const empfind = await this.employeemodel.find({}, {password:0 });
    return empfind;
  }

  async findEmployeeById(id: mongoose.Types.ObjectId): Promise<employee> {
    const empfindid = await this.employeemodel.findById(id);
    return empfindid;
  }

  async updateEmployee(
    id: mongoose.Types.ObjectId,
    employeeUpdateDto: employeeUpdateDto,
  ): Promise<employee> {
    const empupdate = await this.employeemodel.findByIdAndUpdate(
      id,
      employeeUpdateDto,
    );
    return empupdate;
  }

  async updatePassword(
    id: mongoose.Types.ObjectId,
    updatepassDto: updatepassDto,
  ): Promise<employee> {
    const { password,confirmPassword } = updatepassDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Password do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptPassword = { password: hashedPassword };

    const updatedUser = await this.employeemodel.findByIdAndUpdate(
      id,
      encryptPassword,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with #${id} not found`);
    }

    return updatedUser;
  }

  async deleteEmployee(id: mongoose.Types.ObjectId): Promise<employee> {
    const empdelete = await this.employeemodel.findByIdAndDelete(id);
    return empdelete;
  }
}
