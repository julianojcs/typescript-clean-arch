import { dataSourceInMemory as dataSource } from '../dataSource';
import { Patient, PatientProps } from '../../../../domain/patient/patient.entity'

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});
let patientProps: PatientProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  isActive: true
}

describe('PatientSchema Tests', () => {
  test('should create a new patient', async () => {
    const patient = Patient.create(patientProps)
    const patientRepo = dataSource.getRepository(Patient)
    await patientRepo.save(patient)
    // console.log(await patientRepo.findBy( {name: 'Jhoe Doe'} ))
    expect(patient.id).toBeDefined();
    expect(patient.name).toBe('John Doe');
    expect(patient.email).toBe('john@doe.com');
    expect(patient.phone).toBe('11999999999');
    expect(patient.isActive).toBe(true);
  })
});
