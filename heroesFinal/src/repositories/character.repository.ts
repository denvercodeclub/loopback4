import {DefaultCrudRepository, juggler, BelongsToAccessor, repository} from '@loopback/repository';
import {Character, Species, Planet} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { SpeciesRepository } from './species.repository';
import { PlanetRepository } from './planet.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id
> {
  public readonly friend: BelongsToAccessor<
    Character,
    typeof Character.prototype.id
  >;

  public readonly species: BelongsToAccessor<
    Species,
    typeof Character.prototype.id
  >;

  public readonly planet: BelongsToAccessor<
    Planet,
    typeof Character.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('SpeciesRepository')
    speciesRepositoryGetter: Getter<SpeciesRepository>,
    @repository.getter('PlanetRepository')
    planetRepositoryGetter: Getter<PlanetRepository>,
  ) {
    super(Character, dataSource);
    this.friend = this._createBelongsToAccessorFor(
      'friend',
      Getter.fromValue(this),
    );
    this.species= this._createBelongsToAccessorFor(
      'species',
      speciesRepositoryGetter,
    );
    this.planet = this._createBelongsToAccessorFor(
      'planet',
      planetRepositoryGetter,
    );

  }
}
