import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async createuser(dto: employeeDto) {
    const { username, password, jobrole,experience,role } = dto;
    const hashedpassword = await bcrypt.hash(password,10);

    const userdetails = await this.employeemodel.create({
      username,
      password: hashedpassword,
      jobrole,
      experience,
      role,
    });

    const payload = { sub: userdetails.id, role:userdetails.role };
    const acessToken = await this.jwtservice.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });

    return { userdetails: userdetails,token:acessToken };
  }  


  async login(username: string, password: string) {
    const empLogin = await this.findUserName(username);
    if (!empLogin) {
     throw new NotFoundException('User not found')
    }
    const validpassword = await bcrypt.compare(password,empLogin.password);
    if (!validpassword) {
      throw new UnauthorizedException('password not matched');
    }
    const payload = { sub: empLogin.id, role: empLogin.role };
    const acessToken = await this.jwtservice.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
    return { acessToken };
  }
}
