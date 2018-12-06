import {model, property, Entity, belongsTo} from '@loopback/repository';
import { Hero } from './hero.model';

@model()
export class Species extends Entity {
  @property({
    name: 'name',
    description: "The species name",
    type: 'string',
    id: true
  })
  name: string;

  @property({
    name: 'planet',
    description: "The planet the species is from",
    type: 'string',
  })
  planet: string;
  
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