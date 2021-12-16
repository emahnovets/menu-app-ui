import { RoleDto } from 'types/role-dto.interface';

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleDto[];
}
