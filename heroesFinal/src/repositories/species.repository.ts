import {DefaultCrudRepository, juggler, BelongsToAccessor, repository} from '@loopback/repository';
import {Species, Planet} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { PlanetRepository } from './planet.repository';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id
> {

  public readonly planet: BelongsToAccessor<
    Planet,
    typeof Species.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PlanetRepository')
    planetRepositoryGetter: Getter<PlanetRepository>,
  ) {
    super(Species, dataSource);
    this.planet = this._createBelongsToAccessorFor(
      'planet',
      planetRepositoryGetter,
    );
  }
}
