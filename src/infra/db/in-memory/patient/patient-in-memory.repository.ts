import { Patient } from "../../../../domain/patient/patient.entity";
import { PatientRepositoryInterface } from "../../../../domain/patient/patient.repository";

export class PatientInMemoryRepository implements PatientRepositoryInterface {
  items: Patient[] = [];
  async insert(patient: Patient): Promise<void> {
    this.items.push(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.items;
  }
}
