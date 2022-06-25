import { User, 
  UserProps, 
  UserRoleDefaultValue, 
  UserShiftTimePeriodDefaultValue, 
  UserShiftWeekDaysDefaultValue,
  transformEmail,
  transformName,
  transformPhone
} from "./user.entity";
import crypto from 'crypto';

let userProps: UserProps = {
  id: crypto.randomUUID(),
  name: "john doe",
  email: "John@DOE.com",
  phone: "11999999999",
  role: "admin",
  isActive: true
}
let user = User.create(userProps);

describe('Create User Tests', () => {
  test('constructor', () => {
    user = User.create(userProps);
    console.log(user);
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@doe.com');
    expect(user.phone).toBe('11999999999');
    expect(user.role).toBe('admin');
    expect(user.shiftTimePeriod).toStrictEqual(UserShiftTimePeriodDefaultValue);
    expect(user.shiftWeekDays).toStrictEqual(UserShiftWeekDaysDefaultValue);
    expect(user.isActive).toBe(true);
  })

  test('constructor with empty shiftTimePeriod and shiftTimePeriod', () => {
    user = User.create({
      ...userProps
    });
    expect(user.props).toStrictEqual({
      ...userProps,
      name: transformName(userProps.name),
      email: transformEmail(userProps.email),
      phone: transformPhone(userProps.phone),
      shiftTimePeriod: UserShiftTimePeriodDefaultValue,
      shiftWeekDays: UserShiftWeekDaysDefaultValue
    });
  })
  
  test('constructor with shiftTimePeriod and shiftTimePeriod', () => {
    user = User.create({
      ...userProps,
      shiftTimePeriod: ["matutino"], 
      shiftWeekDays: ["Segunda-feira"]
    });
    expect(user.props).toStrictEqual({
      ...userProps,
      name: transformName(userProps.name),
      email: transformEmail(userProps.email),
      phone: transformPhone(userProps.phone),
      shiftTimePeriod: ["matutino"], 
      shiftWeekDays: ["Segunda-feira"]
    });
  })
  test('constructor with another shiftTimePeriod and shiftTimePeriod', () => {
    user = User.create({
      ...userProps,
      shiftTimePeriod: ["matutino", "vespertino"],
      shiftWeekDays: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]
    });
    expect(user.props).toStrictEqual({
      ...userProps, 
      name: transformName(userProps.name),
      email: transformEmail(userProps.email),
      phone: transformPhone(userProps.phone),
      shiftTimePeriod: ["matutino", "vespertino"],
      shiftWeekDays: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]
    });
  })

})

describe('Update User Tests', () => {
  test('All update methods', () => {
    user.updateName('juliano da costa');
    user.updateEmail('APFJULIANO@GMAIL.COM');
    user.updatePhone('(27)98133-0708');
    user.updateRole('medico');
    user.updateShiftTimePeriod(["matutino"]);
    user.updateShiftWeekDays(["Segunda-feira, Terça-feira, Quarta-feira"]);
    user.updateStatus(false);
    expect(user.name).toBe('Juliano da Costa');
    expect(user.email).toBe('apfjuliano@gmail.com');
    expect(user.phone).toBe('27981330708');
    expect(user.role).toBe('medico');
    expect(user.shiftTimePeriod).toStrictEqual(['matutino']);
    expect(user.shiftWeekDays).toStrictEqual(['Segunda-feira, Terça-feira, Quarta-feira']);
    expect(user.isActive).toBe(false);
  })
  test('All update methods', () => {
    user.updateShiftTimePeriod();
    user.updateShiftWeekDays();
    expect(user.shiftTimePeriod).toStrictEqual(UserShiftTimePeriodDefaultValue);
    expect(user.shiftWeekDays).toStrictEqual(UserShiftWeekDaysDefaultValue);
  })
  test('Activate and deactivate methods', () => {
    user.updateStatus(true);
    expect(user.isActive).toBe(true);
    user.deactivate();
    expect(user.isActive).toBe(false);
    user.activate();
    expect(user.isActive).toBe(true);
  })
});

describe('User toJSON Tests', () => {
  let user = User.create({...userProps});
  test('toJSON method', () => {
    expect(user.props).toStrictEqual({
      ...userProps,
      name: transformName(userProps.name),
      email: transformEmail(userProps.email),
      phone: transformPhone(userProps.phone),
      shiftTimePeriod: UserShiftTimePeriodDefaultValue,
      shiftWeekDays: UserShiftWeekDaysDefaultValue
    });
  });
});