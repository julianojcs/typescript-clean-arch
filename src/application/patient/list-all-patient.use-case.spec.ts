import { PatientInMemoryRepository } from "../../infra/db/in-memory/patient/patient-in-memory.repository";
import { CreatePatientOutput, CreatePatientUseCase } from "./create-patient.use-case";
import { ListAllPatientsUseCase } from "./list-all-patient.use-case";
import { PatientProps } from "../../domain/patient/patient.entity";

const patientProps: PatientProps = {
  name: "John Doe",
  email: "john@doe.com",
  phone: "11999999999",
  isActive: true
}
const repository = new PatientInMemoryRepository();
const createPatientUseCase = new CreatePatientUseCase(repository);  

describe('ListAllPatientsUseCase Tests', () => {
  it('should list all patients', async () => {
    const patients: CreatePatientOutput[] = [];
    for (let i=0; i<3; i++) {
      const result = await createPatientUseCase.execute({...patientProps, name: `John Doe #${i+1}`});
      patients.push(result);
    }
    const listAllPatientsUseCase = new ListAllPatientsUseCase(repository)
    const patientsList = listAllPatientsUseCase.execute()
    patientsList.then(list => expect(list).toHaveLength(3));
    patientsList.then(list => expect(list).toHaveLength(patients.length));
    patientsList.then(list => list.forEach((patient, index) => {
      expect(patient.name).toBe(`John Doe #${index+1}`);
    }));
    patientsList.then(list => list.forEach((patient, index) => {
      expect(patient).toStrictEqual(patients[index]);
    }));
  });
})