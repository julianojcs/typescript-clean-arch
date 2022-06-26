import crypto from 'crypto';
import { transformEmail, transformPhone, transformName } from '../../util'

export type PatientProps = {
  id?: string;
  name: string, 
  email: string | null,
  phone: string | null,
  isActive: boolean,
}

export class Patient {
  public props: Required<PatientProps>
  constructor(props: PatientProps) {
    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {}
      return;
    }
    this.props = {
      id: props.id || crypto.randomUUID(),
      name: transformName(props.name),
      email: transformEmail(props.email),
      phone: transformPhone(props.phone),
      isActive: props?.isActive!==false && true,
    };
  }

  static create(props: PatientProps): Patient {
    return new Patient(props);
  }

  get id() {
    return this.props.id;
  }
  private set id(value: string) {
    this.props.id = value || crypto.randomUUID();
  }
  get name() {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name =transformName(value);
  }
  get email() {
    return this.props.email;
  }
  private set email(value: string | null) {
    this.props.email = transformEmail(value);
  }
  get phone() {
    return this.props.phone;
  }
  private set phone(value: string | null) {
    this.props.phone = transformPhone(value);
  }
  get isActive() {
    return this.props.isActive!==false && true;
  }
  private set isActive(value: boolean) {
    this.props.isActive = value;
  }
  updateName(value: string) {
    this.name = transformName(value);
  }
  updateEmail(value: string | null) {
    this.email = transformEmail(value);
  }
  updatePhone(value: string | null) {
    this.phone = transformPhone(value);
  }
  updateStatus(value: boolean) {
    this.isActive = value;
  }
  deactivate() {
    this.isActive = false;
  }
  activate() {
    this.isActive = true;
  }
  toJSON() {
    return this.props;
  }
}
