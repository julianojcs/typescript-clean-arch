import { UserInMemoryRepository } from "./user-in-memory.repository";
import { User, UserProps } from "../../../../domain/user/user.entity";

let userProps: UserProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  role: "admin",
  shiftTimePeriod: ["matutino"],
  shiftWeekDays: ["Segunda-feira"],
  isActive: true
}
let user = User.create(userProps);

describe('UserInMemory Repository Tests', () => {
  it('should insert a new user', async () => {
    const repository = new UserInMemoryRepository();
    await repository.insert(user);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toStrictEqual(user);
  })
  it('should find all users', async () => {
    const users: User[] = [];
    const repository = new UserInMemoryRepository();
    for (let i=0; i<3; i++) {
      let user = User.create({...userProps, name: `John Doe #${i+1}`});
      await repository.insert(user);
      users.push(user);
    }
    const userList = await repository.findAll();
    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(users.length);
    expect(repository.items).toHaveLength(userList.length);
    expect(repository.items[0]).toStrictEqual(users[0]);
    expect(repository.items[1]).toStrictEqual(userList[1]);
    expect(repository.items[2].name).toBe('John Doe #3');
  })
})