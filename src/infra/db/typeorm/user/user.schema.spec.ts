import { dataSourceInMemory as dataSource } from './../dataSource';
import { User, UserProps } from '../../../../domain/user/user.entity'

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});
let userProps: UserProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  role: "admin",
  shiftTimePeriod: ["matutino"],
  shiftWeekDays: ["Segunda-feira"],
  isActive: true
}

describe('UserSchema Tests', () => {
  test('should create a new user', async () => {
    const user = User.create(userProps)
    const userRepo = dataSource.getRepository(User)
    await userRepo.save(user)
    // console.log(await userRepo.findBy( {name: 'Jhoe Doe'} ))
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@doe.com');
    expect(user.phone).toBe('11999999999');
    expect(user.role).toBe('admin');
    expect(user.shiftTimePeriod).toStrictEqual(["matutino"]);
    expect(user.shiftWeekDays).toStrictEqual(["Segunda-feira"]);
    expect(user.isActive).toBe(true);
  })
});
