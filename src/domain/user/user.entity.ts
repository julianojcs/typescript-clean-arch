import crypto from 'crypto';
// export type UserRoleType = "admin" | "medico" | "recepcionista"
// export type UserShiftWeekDays = "Segunda-feira" | "Terça-feira" | "Quarta-feira" | "Quinta-feira" | "Sexta-feira"
export const UserRoleDefaultValue = "recepcionista"
export const UserShiftTimePeriodDefaultValue = ['matutino', 'vespertino']
export const UserShiftWeekDaysDefaultValue = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']

export type UserProps = {
  id?: string;
  name: string, 
  email: string | null,
  phone: string | null,
  role?: string,
  shiftTimePeriod?: Array<string>,
  shiftWeekDays?: Array<string>,
  isActive: boolean,
}

export const transformPhone = (phone: string | null): string | null => {
  return phone ? phone.replace(/[^0-9]/g, '') : null;
}

export const transformName = (name: string): string => {
  return name.split(" ").map((s) => {
    return s.length > 2 ? s[0].toUpperCase() + s.slice(1) : s
  }).join(" ");
}

export const transformEmail = (email: string | null): string | null => {
  return email ? email.toLowerCase() : null;
}

export class User {
  public props: Required<UserProps>
  constructor(props: UserProps) {
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
      role: props?.role || UserRoleDefaultValue,
      shiftTimePeriod: props?.shiftTimePeriod || UserShiftTimePeriodDefaultValue,
      shiftWeekDays: props?.shiftWeekDays || UserShiftWeekDaysDefaultValue,
      isActive: props?.isActive!==false && true,
    };
    console.log(this.props);
    
    // if (this.props.shiftTimePeriod === null) {
    //   this.props.shiftTimePeriod = ['matutino', 'vespertino'];
    // }
  }

  static create(props: UserProps): User {
    return new User(props);
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
  get role() {
    return this.props.role || UserRoleDefaultValue;
  }
  private set role(value: string ) {
    this.props.role = value || UserRoleDefaultValue;
  }
  get shiftTimePeriod() {
    return this.props.shiftTimePeriod || UserShiftTimePeriodDefaultValue;
  }
  private set shiftTimePeriod(value: string[]) {
    this.props.shiftTimePeriod = value || UserShiftTimePeriodDefaultValue;
  }
  get shiftWeekDays() {
    return this.props.shiftWeekDays || UserShiftWeekDaysDefaultValue;
  }
  private set shiftWeekDays(value: string[]) {
    this.props.shiftWeekDays = value || UserShiftWeekDaysDefaultValue;
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
  updateRole(value?: string) {
    this.role = value || 'recepcionista';
  }
  updateShiftTimePeriod(value?: string[]) {
    this.shiftTimePeriod = value || UserShiftTimePeriodDefaultValue;
  }
  updateShiftWeekDays(value?: string[]) {
    this.shiftWeekDays = value || UserShiftWeekDaysDefaultValue;
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
