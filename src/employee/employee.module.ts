import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeSchema } from './employee.schema';
import { employeeController } from './employee.controller';
import { employeeservice } from './employee.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [    
    MongooseModule.forFeature([{ name: employee.name, schema: employeeSchema }]),
  ],
  controllers: [employeeController],
  providers: [employeeservice,JwtService],
})
export class employeeModule {}
