import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { UserRole } from 'src/employee/employee.dto';
export const UserRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
