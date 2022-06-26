import { PatientProps } from "../../domain/patient/patient.entity";
import { PatientRepositoryInterface } from "../../domain/patient/patient.repository";

export class ListAllPatientsUseCase {
  constructor(private patientRepo: PatientRepositoryInterface) {}

  async execute(): Promise<PatientProps[]> {
    const patients = await this.patientRepo.findAll();
    return patients.map((patient) => patient.toJSON());
  }
}