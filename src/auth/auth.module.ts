import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeSchema } from 'src/employee/employee.schema';
import { authController } from './auth.controller';
import { authService } from './auth.service';
import { employeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: employee.name, schema: employeeSchema },
    ]),
    employeeModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 20 },
    }),
  ],
  controllers: [authController],
  providers: [authService, JwtService],
})
export class authModule {}
