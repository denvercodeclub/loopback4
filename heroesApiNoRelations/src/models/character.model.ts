import {Entity, model, property, hasOne, hasMany, belongsTo} from '@loopback/repository';
import { Planet } from './planet.model';
import { Species } from './species.model';

@model()
export class Character extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  friendId: number;

  @property({
    type: 'number',
  })
  planetId: number;

  @property({
    type: 'number',
  })
  speciesId: number;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}
