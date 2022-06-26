import { Patient, 
  PatientProps, 
} from "./patient.entity";
import { transformEmail, transformPhone, transformName } from '../../util'
import crypto from 'crypto';

let patientProps: PatientProps = {
  id: crypto.randomUUID(),
  name: "john doe",
  email: "John@DOE.com",
  phone: "11999999999",
  isActive: true
}
let patient = Patient.create(patientProps);

describe('Create Patient Tests', () => {
  test('constructor', () => {
    patient = Patient.create(patientProps);
    expect(patient.id).toBeDefined();
    expect(patient.name).toBe('John Doe');
    expect(patient.email).toBe('john@doe.com');
    expect(patient.phone).toBe('11999999999');
    expect(patient.isActive).toBe(true);
  })

  test('constructor with empty shiftTimePeriod and shiftTimePeriod', () => {
    patient = Patient.create({
      ...patientProps
    });
    expect(patient.props).toStrictEqual({
      ...patientProps,
      name: transformName(patientProps.name),
      email: transformEmail(patientProps.email),
      phone: transformPhone(patientProps.phone)
    });
  })
  
  test('constructor with shiftTimePeriod and shiftTimePeriod', () => {
    patient = Patient.create({
      ...patientProps
    });
    expect(patient.props).toStrictEqual({
      ...patientProps,
      name: transformName(patientProps.name),
      email: transformEmail(patientProps.email),
      phone: transformPhone(patientProps.phone)
    });
  })
})

describe('Update Patient Tests', () => {
  test('All update methods', () => {
    patient.updateName('juliano da costa');
    patient.updateEmail('APFJULIANO@GMAIL.COM');
    patient.updatePhone('(27)98133-0708');
    patient.updateStatus(false);
    expect(patient.name).toBe('Juliano da Costa');
    expect(patient.email).toBe('apfjuliano@gmail.com');
    expect(patient.phone).toBe('27981330708');
    expect(patient.isActive).toBe(false);
  })
  test('Activate and deactivate methods', () => {
    patient.updateStatus(true);
    expect(patient.isActive).toBe(true);
    patient.deactivate();
    expect(patient.isActive).toBe(false);
    patient.activate();
    expect(patient.isActive).toBe(true);
  })
});

describe('Patient toJSON Tests', () => {
  let patient = Patient.create({...patientProps});
  test('toJSON method', () => {
    expect(patient.props).toStrictEqual({
      ...patientProps,
      name: transformName(patientProps.name),
      email: transformEmail(patientProps.email),
      phone: transformPhone(patientProps.phone)
    });
  });
});