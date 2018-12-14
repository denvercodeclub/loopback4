# Heroes Api with LoopBack 4

## Part 1

### Installing Loopback 4 

`npm i -g @loopback/cli`

### Generating a base application

`lb4 app`

### Select appropriate options:

```
? Project name: heroes
? Project description: heroes api
? Project root directory: /heroes
? Application class name: Heroes
? Select features to enable in the project:
❯◉ Enable tslint
 ◉ Enable prettier
 ◉ Enable mocha
 ◉ Enable loopbackBuild
 ◉ Enable vscode
 ◉ Enable repositories
 ◉ Enable services
```

### Creating your first model

* run `lb4 model` to generate your model

  Or

* create a file under /src/models named `character.model.ts` and add:

``` {typescript}
import {Entity, model, property} from '@loopback/repository';

@model()
export class Character extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  friend: string;

  @property({
    type: 'string',
    required: true,
  })
  planetId: string;

  @property({
    type: 'string',
    required: true,
  })
  species: string;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}
```

* add `export * from './character.model';` to index.ts

### Now we want to add a datasource

* create two files, one called `db.datasource.json` and one called `db.datasouce.ts` in the folder /src/datasources

* in `db.datasource.json` we want to add:

``` {json}
{
    "name": "db",
    "connector": "memory",
    "localStorage": "",
    "file": "./data/db.json"
}
```

* in `db.datasource.ts` we want to add:

``` {typesscipt}
import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './db.datasource.json';

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
```

* We now want to create a folder called `data` with a file called `db.json` in the root directory of the app.

## Next we are going to work on repository

* create a file under /src/repositories named `character.repository.ts`

``` {typescript}
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
```

* add `export * from './character.repository;` to index.ts

### For the final step to get your app up and running we need to add a controller

* create a file under /src/repositories named `character.controller.ts`

``` {typescript}
import {
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
import {Character} from '../models';
import {CharacterRepository} from '../repositories';

export class HeroController {
  constructor(
    @repository(CharacterRepository)
    public characterRepository : CharacterRepository,
  ) {}

  @post('/heroes', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async create(@requestBody() character: Character): Promise<Character> {
    return await this.characterRepository.create(character);
  }

  @get('/heroes', {
    responses: {
      '200': {
        description: 'Array of Character model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Character}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Character)) filter?: Filter,
  ): Promise<Character[]> {
    return await this.characterRepository.find(filter);
  }

  @patch('/heroes', {
    responses: {
      '200': {
        description: 'Character PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() character: Character,
    @param.query.object('where', getWhereSchemaFor(Character)) where?: Where,
  ): Promise<Count> {
    return await this.characterRepository.updateAll(character, where);
  }

  @get('/heroes/{id}', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Character> {
    return await this.characterRepository.findById(id);
  }

  @patch('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Character PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() character: Character,
  ): Promise<void> {
    await this.characterRepository.updateById(id, character);
  }

  @del('/heroes/{id}', {
    responses: {
      '204': {
        description: 'Character DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.characterRepository.deleteById(id);
  }
```

* add `export * from './character.controller;` to index.ts

### Now lets start our server:

`npm run start`

## Part 2

### Lets start by adding a few new models

* first lets add `planet.model.ts`

``` {typescript}
import {Entity, model, property} from '@loopback/repository';

@model()
export class Planet extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  climate: string;

  constructor(data?: Partial<Planet>) {
    super(data);
  }
}
```

* next lets add `species.model.ts`

``` {typescript}
import {model, property, Entity, belongsTo} from '@loopback/repository';
import { Planet } from './planet.model';

@model()
export class Species extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    name: 'name',
    description: "The species name",
    type: 'string',
  })
  name: string;

  @belongsTo(() => Planet, {keyTo: 'id'})
  planetId: number;
  
  @property({
    name: 'lifespan',
    description: "The lifespan of the species",
    type: 'number',
  })
  lifespan: number;

  constructor(data?: Partial<Species>) {
    super(data);
  }
 
}
```

* and now lets update `character.model.ts`

``` {typescript}
import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Planet } from './planet.model';
import { Species } from './species.model';

@model()
export class Character extends Entity {

  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Character, {keyTo: 'id'})
  friendId: number;

  @belongsTo(() => Planet, {keyTo: 'id'})
  planetId: number;

  @belongsTo(() => Species, {keyTo: 'id'})
  speciesId: number;

  constructor(data?: Partial<Character>) {
    super(data);
  }
}
```

### Now lets work on repositories

* lets create the planet repository by running:

`lb4 repository`

```
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Planet
   create src/repositories/planet.repository.ts
   update src/repositories/index.ts

Repository Todo was created in src/repositories/
```

* now lets create the species repository the same way:

`lb4 repository`

```
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Species
   create src/repositories/species.repository.ts
   update src/repositories/index.ts
```

* and finally lets update the Character repository

``` {typescript}
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
```

### now for the controllers

* We don't need to add the controllers for species and planet but we could by running `lb4 controller` and selecting the options.

* We do want to add some new functionalities to the `character.controller.ts`. Add these new methods below the existing:

``` {typescript}
@get('/heroes/{id}/friend', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Character}}},
      },
    },
  })
  async getFriend(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Character> {
    return await this.characterRepository.friend(heroId);
  }

  @get('/heroes/{id}/planet', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Planet}}},
      },
    },
  })
  async getPlanet(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Planet> {
    return await this.characterRepository.planet(heroId);
  }

  @get('/heroes/{id}/species', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Species}}},
      },
    },
  })
  async getSpecies(
    @param.path.number('id') heroId: typeof Character.prototype.id,
  ): Promise<Species> {
    return await this.characterRepository.species(heroId);
  }
  ``` 

### Finally we want to add some data to the db.json

``` {json}
{
  "ids": {
    "Planet": 4,
    "Species": 4,
    "Character": 5
  },
  "models": {
    "Planet": {
      "1": "{\"id\":1,\"name\":\"Earth\",\"climate\":\"Earthy\"}",
      "2": "{\"id\":2,\"name\":\"Krypton\",\"climate\":\"Kryptony\"}",
      "3": "{\"id\":3,\"name\":\"Themyscira\",\"climate\":\"Themysciray\"}"

    },
    "Species": {
      "1": "{\"id\":1,\"name\":\"Human\",\"planetId\":1,\"lifespan\":80}",
      "2": "{\"id\":2,\"name\":\"Kryptonian\",\"planetId\":2,\"lifespan\":200}",
      "3": "{\"id\":3,\"name\":\"Demi-Goddess\",\"planetId\":3,\"lifespan\":1000}"

    },
    "Character": {
      "1": "{\"id\":1,\"name\":\"Batman\",\"friendId\":2,\"planetId\":1,\"speciesId\":1}",
      "2": "{\"id\":2,\"name\":\"Robin\",\"friendId\":1,\"planetId\":1,\"speciesId\":1}",
      "3": "{\"id\":3,\"name\":\"Superman\",\"friendId\":4,\"planetId\":2,\"speciesId\":2}",
      "4": "{\"id\":4,\"name\":\"Wonder Woman\",\"friendId\":3,\"planetId\":3,\"speciesId\":3}"
    }
  }
```

### Now we are ready to run our server again:

`npm run start`

## Part 3 (Generating base project from swagger)

### Getting Swagger

* Get the swagger from the end of part 2 at `http://127.0.0.1:3000/openapi.json`

* Save this in a file called swagger.json

* Generate a new base app using `lb4 app`

* now we want to run: `lb4 openapi` and direct to the swagger we just created. This will create your models for you automatically and create stub controllers based on the swagger the rest is up to you.

## Part 4 (Using OASGraph to convert to graphql)

### Installing OASGRAPH

`npm i oasgraph`

* Now if we run: `oasgraph {pathToSwagger}` we will start the graphql server

* We also want to make sure that the api from part 2 is running `npm run start`

### Now we want graphql to get the species, friend and planet data as well as the hero

* Add links on the `GET` endpoints `/heroes/{id}` and `/heroes` under the response:

``` {json}
"links": {
    "friend": {
        "operationId": "getCurrentFriend",
        "parameters": {
            "id": "$response.body#/id"
        }
    },
    "planet": {
        "operationId": "getCurrentPlanet",
        "parameters": {
            "id": "$response.body#/id"
        }
    },
    "species": {
        "operationId": "getCurrentSpecies",
        "parameters": {
            "id": "$response.body#/id"
        }
    }
}
```

* Update the operationId for the `heroes/{id}/character`, `heroes/{id}/planet`, and `heroes/{id}/species` endpoints.

* Restart the oasgraph server
