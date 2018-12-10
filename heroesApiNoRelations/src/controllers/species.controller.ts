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
import {Species} from '../models';
import {SpeciesRepository} from '../repositories';

export class SpeciesController {
  constructor(
    @repository(SpeciesRepository)
    public speciesRepository : SpeciesRepository,
  ) {}

  @post('/species', {
    responses: {
      '200': {
        description: 'Species model instance',
        content: {'application/json': {schema: {'x-ts-type': Species}}},
      },
    },
  })
  async create(@requestBody() species: Species): Promise<Species> {
    return await this.speciesRepository.create(species);
  }

  @get('/species/count', {
    responses: {
      '200': {
        description: 'Species model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Species)) where?: Where,
  ): Promise<Count> {
    return await this.speciesRepository.count(where);
  }

  @get('/species', {
    responses: {
      '200': {
        description: 'Array of Species model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Species}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Species)) filter?: Filter,
  ): Promise<Species[]> {
    return await this.speciesRepository.find(filter);
  }

  @patch('/species', {
    responses: {
      '200': {
        description: 'Species PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() species: Species,
    @param.query.object('where', getWhereSchemaFor(Species)) where?: Where,
  ): Promise<Count> {
    return await this.speciesRepository.updateAll(species, where);
  }

  @get('/species/{id}', {
    responses: {
      '200': {
        description: 'Species model instance',
        content: {'application/json': {schema: {'x-ts-type': Species}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Species> {
    return await this.speciesRepository.findById(id);
  }

  @patch('/species/{id}', {
    responses: {
      '204': {
        description: 'Species PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() species: Species,
  ): Promise<void> {
    await this.speciesRepository.updateById(id, species);
  }

  @del('/species/{id}', {
    responses: {
      '204': {
        description: 'Species DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.speciesRepository.deleteById(id);
  }
}
