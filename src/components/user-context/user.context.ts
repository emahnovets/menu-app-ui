import { createContext } from 'react';
import { UserDto } from 'types/user-dto.interface';

export const UserContext = createContext<UserDto | null>(null);
