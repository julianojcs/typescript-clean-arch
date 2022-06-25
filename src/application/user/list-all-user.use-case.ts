import { UserProps } from "../../domain/user/user.entity";
import { UserRepositoryInterface } from "../../domain/user/user.repository";

export class ListAllUsersUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(): Promise<UserProps[]> {
    const users = await this.userRepo.findAll();
    return users.map((user) => user.toJSON());
  }
}