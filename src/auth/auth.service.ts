import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { employeeDto } from 'src/employee/employee.dto';
import { employee } from 'src/employee/employee.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class authService {
  constructor(
    @InjectModel(employee.name)
    private readonly employeemodel: mongoose.Model<employee>,
    private readonly jwtservice: JwtService,
  ) {}

  async findUserName(username: string) {
    return await this.employeemodel.findOne({ username });
  }

  async createEmployee(employeeDto: employeeDto): Promise<employee> {
    const { username, password, jobrole, experience, role } = employeeDto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await this.employeemodel.create({ username, password: hashedpassword, jobrole, role, experience,});
    return user;
  }

  async login(username: string, password: string) {
    const empLogin = await this.findUserName(username);
    if (!empLogin) {
      throw new NotFoundException('user not found');
    }
    const validpassword = await bcrypt.compare(password, empLogin.password);
    if (!validpassword) {
      throw new NotFoundException('password not matched');
    }
    const payload = {sub: empLogin.id, role: empLogin.role, };
    const acessToken = await this.jwtservice.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
    return { acessToken };
  }
}
