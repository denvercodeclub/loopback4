import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import { Planet } from './planet.model';
import { Species } from './species.model';

@model()
export class Character extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  name: string;

  @property.array(Character)
  friends?: Character[];

  @hasOne(() => Planet)
  homeWorld: Planet;

  @hasOne(() => Species)
  species: Species;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}
