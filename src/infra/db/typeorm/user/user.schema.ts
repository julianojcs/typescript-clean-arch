import { EntitySchema } from 'typeorm'
import { User } from '../../../../domain/user/user.entity'

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  target: User,
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
    role: {
      type: String,
      nullable: true,
      enum: ['admin', 'medico', 'recepcionista']
    },
    shiftTimePeriod: {
      type: 'simple-array',
      nullable: true,
      // enum: ['matutino', 'vespertino']
    },
    shiftWeekDays: {
      type: 'simple-array',
      nullable: true,
      // enum: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']
    },
    isActive: {
      type: Boolean,
      nullable: false,
      default: true
    },
    // created_at: {
    //   type: 'timestamp',
    //   default: 'CURRENT_TIMESTAMP',
    // },
    // updated_at: {
    //   type: 'timestamp',
    //   default: 'CURRENT_TIMESTAMP',
    // },
  },
  checks: [
    { expression: `"role" IS NOT NULL` },
    { expression: `"shiftTimePeriod" IS NOT NULL` },
    { expression: `"shiftWeekDays" IS NOT NULL` },
  ]
})