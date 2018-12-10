import {model, property, Entity, belongsTo} from '@loopback/repository';
import { Planet } from './planet.model';

@model()
export class Species extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    name: 'name',
    description: "The species name",
    type: 'string',
  })
  name: string;

  @belongsTo(() => Planet, {keyTo: 'id'})
  planetId: number;
  
  @property({
    name: 'lifespan',
    description: "The lifespan of the species",
    type: 'number',
  })
  lifespan: number;

  constructor(data?: Partial<Species>) {
    super(data);
  }
 
}