import { UserInMemoryRepository } from "../../infra/db/in-memory/user/user-in-memory.repository";
import { CreateUserOutput, CreateUserUseCase } from "./create-user.use-case";
import { ListAllUsersUseCase } from "./list-all-user.use-case";
import { User, UserProps } from "../../domain/user/user.entity";

const userProps: UserProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  role: "admin",
  shiftTimePeriod: ["matutino"],
  shiftWeekDays: ["Segunda-feira"],
  isActive: true
}
const repository = new UserInMemoryRepository();
const createUserUseCase = new CreateUserUseCase(repository);  

describe('ListAllUsersUseCase Tests', () => {
  it('should list all users', async () => {
    const users: CreateUserOutput[] = [];
    for (let i=0; i<3; i++) {
      const result = await createUserUseCase.execute({...userProps, name: `John Doe #${i+1}`});
      users.push(result);
    }
    const listAllUsersUseCase = new ListAllUsersUseCase(repository)
    const usersList = listAllUsersUseCase.execute()
    usersList.then(list => expect(list).toHaveLength(3));
    usersList.then(list => expect(list).toHaveLength(users.length));
    usersList.then(list => list.forEach((user, index) => {
      expect(user.name).toBe(`John Doe #${index+1}`);
    }));
    usersList.then(list => list.forEach((user, index) => {
      expect(user).toStrictEqual(users[index]);
    }));
  });
})