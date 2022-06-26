import { Patient, PatientProps } from "../../domain/patient/patient.entity"
import { PatientRepositoryInterface } from "../../domain/patient/patient.repository";

export type CreatePatientInput = PatientProps

export type CreatePatientOutput = {
  id: string;
  name: string, 
  email: string | null,
  phone: string | null,
  role?: string | null,
  shiftTimePeriod?: Array<string>,
  shiftWeekDays?: Array<string>,
  isActive: boolean,
}

export class CreatePatientUseCase {
  constructor(private patientRepo: PatientRepositoryInterface) {}
  
  async execute(input: CreatePatientInput): Promise<CreatePatientOutput> {
    const patient = Patient.create(input);
    await this.patientRepo.insert(patient);
    return patient.toJSON();
  }
}