import { PatientInMemoryRepository } from "./patient-in-memory.repository";
import { Patient, PatientProps } from "../../../../domain/patient/patient.entity";

let patientProps: PatientProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  isActive: true
}
let patient = Patient.create(patientProps);

describe('PatientInMemory Repository Tests', () => {
  it('should insert a new patient', async () => {
    const repository = new PatientInMemoryRepository();
    await repository.insert(patient);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toStrictEqual(patient);
  })
  it('should find all patients', async () => {
    const patients: Patient[] = [];
    const repository = new PatientInMemoryRepository();
    for (let i=0; i<3; i++) {
      let patient = Patient.create({...patientProps, name: `John Doe #${i+1}`});
      await repository.insert(patient);
      patients.push(patient);
    }
    const patientList = await repository.findAll();
    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(patients.length);
    expect(repository.items).toHaveLength(patientList.length);
    expect(repository.items[0]).toStrictEqual(patients[0]);
    expect(repository.items[1]).toStrictEqual(patientList[1]);
    expect(repository.items[2].name).toBe('John Doe #3');
  })
})