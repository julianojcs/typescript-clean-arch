import { User } from "./user.entity";

// Inversão de Dependência
export interface UserRepositoryInterface {
  insert(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}