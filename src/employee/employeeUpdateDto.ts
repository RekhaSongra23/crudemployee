
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './employee.dto';

export class employeeUpdateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
  
  @ApiProperty()
  role:UserRole;
}

 export class updatepassDto{

   @ApiProperty()
   password:string;

   @ApiProperty()
   confirmPassword:string;
}
