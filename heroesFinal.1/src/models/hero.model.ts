import {model, property, Entity, hasMany} from '@loopback/repository';
import { Species } from './species.model';

@model()
export class Hero extends Entity{
  @property({
    name: 'id',
    description: "Hero id",
    type: 'number',
    id: true
  })
  id: number

  @property({
    name: 'name',
    description: "The heroes' name",
    type: 'string',
  })
  name: string;

  @property({
    name: 'hasSuperPowers',
    description: "Hero has super powers",
    type: 'boolean'
  })
  hasSuperPowers: boolean;

  @property({
    name: 'speciesKey',
    description: "key to search for species",
    type: 'string'
  })
  speciesKey: string[];

  constructor(data?: Partial<Hero>) {
    super(data);
  }
}