import { EntitySchema } from 'typeorm'
import { Patient } from '../../../../domain/patient/patient.entity'

export const PatientSchema = new EntitySchema<Patient>({
  name: 'patient',
  target: Patient,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    email: {
      type: String,
      length: 255,
      nullable: true,
    },
    phone: {
      type: String,
      length: 14,
      nullable: true,
    },
    isActive: {
      type: Boolean,
      nullable: false,
      default: true
    },
  },
})