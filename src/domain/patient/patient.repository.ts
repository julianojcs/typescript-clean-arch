import { Patient } from "./patient.entity";

// Inversão de Dependência
export interface PatientRepositoryInterface {
  insert(patient: Patient): Promise<void>;
  findAll(): Promise<Patient[]>;
}