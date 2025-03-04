import 'dotenv/config';

import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { type FastifyInstance } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import homeRoute from './routes/homeRoute';
import professionalRoute from './routes/professionalRoute';

class App {
  public app: FastifyInstance;
  constructor() {
    this.app = fastify().withTypeProvider<ZodTypeProvider>();
    this.init();
  }

  private async init() {
    this.app.register(fastifyCors, {
      origin: 'http://localhost:3333',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Sistema de Reservas',
          description: 'API para o gerenciamento de reservas',
          version: '1.0.0',
        },
      },
      transform: jsonSchemaTransform,
    });

    this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });

    this.app.register(homeRoute.route)
    this.app.register(professionalRoute.route)
  }
}
export default new App().app;
