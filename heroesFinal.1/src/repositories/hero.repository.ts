import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Hero} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HeroRepository extends DefaultCrudRepository<
  Hero,
  typeof Hero.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Hero, dataSource);
  }
}
