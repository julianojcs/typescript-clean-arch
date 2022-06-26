import { transformEmail, transformPhone, transformName} from './'
describe('Create Patient Tests', () => {
  test('constructor', () => {
    expect(transformName('john el doe')).toBe('John el Doe');
    expect(transformName('john EL DOE')).toBe('John el Doe');
    expect(transformEmail(null)).toBe(null);
    expect(transformEmail('JOHN@DOE.COM')).toBe('john@doe.com');
    expect(transformPhone(null)).toBe(null);
    expect(transformPhone('(11)99999-9999')).toBe('11999999999');
  })
})
