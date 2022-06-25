import { User } from "../../../../domain/user/user.entity";
import { Repository } from "typeorm";
import { UserRepositoryInterface } from "../../../../domain/user/user.repository";

export class UserTypeOrmRepository implements UserRepositoryInterface {
  constructor(private ormRepo: Repository<User>) {

  }

  async insert(user: User): Promise<void> {
    await this.ormRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.ormRepo.find();
  }
}