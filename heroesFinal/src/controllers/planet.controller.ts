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
import {Planet} from '../models';
import {PlanetRepository} from '../repositories';

export class PlanetController {
  constructor(
    @repository(PlanetRepository)
    public planetRepository : PlanetRepository,
  ) {}

  @post('/planets', {
    responses: {
      '200': {
        description: 'Planet model instance',
        content: {'application/json': {schema: {'x-ts-type': Planet}}},
      },
    },
  })
  async create(@requestBody() planet: Planet): Promise<Planet> {
    return await this.planetRepository.create(planet);
  }

  @get('/planets/count', {
    responses: {
      '200': {
        description: 'Planet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Planet)) where?: Where,
  ): Promise<Count> {
    return await this.planetRepository.count(where);
  }

  @get('/planets', {
    responses: {
      '200': {
        description: 'Array of Planet model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Planet}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Planet)) filter?: Filter,
  ): Promise<Planet[]> {
    return await this.planetRepository.find(filter);
  }

  @patch('/planets', {
    responses: {
      '200': {
        description: 'Planet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() planet: Planet,
    @param.query.object('where', getWhereSchemaFor(Planet)) where?: Where,
  ): Promise<Count> {
    return await this.planetRepository.updateAll(planet, where);
  }

  @get('/planets/{id}', {
    responses: {
      '200': {
        description: 'Planet model instance',
        content: {'application/json': {schema: {'x-ts-type': Planet}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Planet> {
    return await this.planetRepository.findById(id);
  }

  @patch('/planets/{id}', {
    responses: {
      '204': {
        description: 'Planet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() planet: Planet,
  ): Promise<void> {
    await this.planetRepository.updateById(id, planet);
  }

  @del('/planets/{id}', {
    responses: {
      '204': {
        description: 'Planet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planetRepository.deleteById(id);
  }
}
