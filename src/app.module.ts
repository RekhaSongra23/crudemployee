import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeModule } from './employee/employee.module';
import { authModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    employeeModule,authModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
