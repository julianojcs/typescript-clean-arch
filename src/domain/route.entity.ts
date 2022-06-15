import crypto from 'crypto';

export type LatLng = {
  lat: number;
  lng: number
}

export type RouteProps = {
  readonly id?: string;
  title: string, 
  startPosition: LatLng, 
  endPosition: LatLng, 
  points?: Array<LatLng>
}

// export class Route {
//   constructor(
//     public title: string, 
//     public startPosition: LatLng, 
//     public endPosition: LatLng, 
//     public points: Array<LatLng>) { }
// }

export class Route {
  // public readonly id: string;
  public props: Required<RouteProps>
  
  constructor(props: RouteProps) {
    this.props = {
      id: props.id || crypto.randomUUID(),
      ...props,
      points: props.points || []
    };
  }
  
  get id() {
    return this.props.id;
  }
  get title() {
    return this.props.title;
  }
  private set title(value: string) {
    this.props.title = value;
  }
  get startPosition() {
    return this.props.startPosition;
  }
  private set startPosition(value: LatLng) {
    this.props.startPosition = value;
  }
  get endPosition() {
    return this.props.endPosition;
  }
  private set endPosition(value: LatLng) {
    this.props.endPosition = value;
  }
  get points() {
    return this.props.points;
  }
  private set points(value: Array<LatLng>) {
    this.props.points = value;
  }

  updateTitle(title: string) {
    this.title = title;
    //regras de negócios fica aqui dentro:
    //mudar para maiusculo
    //validar alguns caracteres
  }
  updatePosition(startPosition: LatLng, endPosition: LatLng) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }
  updatePoints(points: Array<LatLng>) {
    this.points = points;
  }

  toJSON() {
    return this.props;
  }
}



