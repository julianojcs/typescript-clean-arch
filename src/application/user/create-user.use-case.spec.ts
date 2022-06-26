import { UserProps } from "../../domain/user/user.entity";
import { transformEmail, transformPhone, transformName } from '../../util'
import { UserInMemoryRepository } from "../../infra/db/in-memory/user/user-in-memory.repository";
import { CreateUserUseCase } from "./create-user.use-case";

const userProps: UserProps = {
  name: "john doe",
  email: "John@doe.com",
  phone: "(11)9999-99999",
  role: "admin",
  shiftTimePeriod: ["matutino"],
  shiftWeekDays: ["Segunda-feira"],
  isActive: true
}
const repository = new UserInMemoryRepository();

describe('CreateUserUseCase Tests', () => {
  it('should create a new user', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);  
    const result = await createUserUseCase.execute(userProps);
    expect(repository.items).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.items[0].id,
      ...userProps,
      name: transformName(repository.items[0].name),
      email: transformEmail(repository.items[0].email),
      phone: transformPhone(repository.items[0].phone),
    });
  });
})