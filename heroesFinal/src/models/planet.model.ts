import {Entity, model, property} from '@loopback/repository';

@model()
export class Planet extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  climate: string;

  constructor(data?: Partial<Planet>) {
    super(data);
  }
}
