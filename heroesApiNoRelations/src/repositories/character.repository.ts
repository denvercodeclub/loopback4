import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Character} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Character, dataSource);
  }
}
