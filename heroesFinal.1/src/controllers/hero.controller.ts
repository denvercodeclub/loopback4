import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Hero} from '../models';
import {HeroRepository} from '../repositories';

export class HeroController {
  constructor(
    @repository(HeroRepository)
    public heroRepository : HeroRepository,
  ) {}

  @post('/heroes', {
    responses: {
      '200': {
        description: 'Hero model instance',
        content: {'application/json': {schema: {'x-ts-type': Hero}}},
      },
    },
  })
  async create(@requestBody() hero: Hero): Promise<Hero> {
    return await this.heroRepository.create(hero);
  }

  @get('/heroes/count', {
    responses: {
      '200': {
        description: 'Hero model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Hero)) where?: Where,
  ): Promise<Count> {
    return await this.heroRepository.count(where);
  }

  @get('/heroes', {
    responses: {
      '200': {
        description: 'Array of Hero model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Hero}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Hero)) filter?: Filter,
  ): Promise<Hero[]> {
    return await this.heroRepository.find(filter);
  }

  @patch('/heroes', {
    responses: {
      '200': {
        description: 'Hero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() hero: Hero,
    @param.query.object('where', getWhereSchemaFor(Hero)) where?: Where,
  ): Promise<Count> {
    return await this.heroRepository.updateAll(hero, where);
  }

  @get('/heroes/{id}', {
    responses: {
      '200': {
        description: 'Hero model instance',
        content: {'application/json': {schema: {'x-ts-type': Hero}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Hero> {
    return await this.heroRepository.findById(id);
  }

  @patch('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Hero PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() hero: Hero,
  ): Promise<void> {
    await this.heroRepository.updateById(id, hero);
  }

  @del('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Hero DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.heroRepository.deleteById(id);
  }
}
