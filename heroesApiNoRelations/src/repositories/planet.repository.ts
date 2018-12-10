import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Planet} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanetRepository extends DefaultCrudRepository<
  Planet,
  typeof Planet.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Planet, dataSource);
  }
}
