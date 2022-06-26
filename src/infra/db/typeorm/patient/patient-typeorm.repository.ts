import { Patient } from "../../../../domain/patient/patient.entity";
import { Repository } from "typeorm";
import { PatientRepositoryInterface } from "../../../../domain/patient/patient.repository";

export class PatientTypeOrmRepository implements PatientRepositoryInterface {
  constructor(private ormRepo: Repository<Patient>) {

  }

  async insert(patient: Patient): Promise<void> {
    await this.ormRepo.save(patient);
  }

  findAll(): Promise<Patient[]> {
    return this.ormRepo.find();
  }
}