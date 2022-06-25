import { User, UserProps } from "../../domain/user/user.entity"
import { UserRepositoryInterface } from "../../domain/user/user.repository";

export type CreateUserInput = UserProps

export type CreateUserOutput = {
  id: string;
  name: string, 
  email: string | null,
  phone: string | null,
  role?: string | null,
  shiftTimePeriod?: Array<string>,
  shiftWeekDays?: Array<string>,
  isActive: boolean,
}

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}
  
  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = User.create(input);
    await this.userRepo.insert(user);
    return user.toJSON();
  }
}