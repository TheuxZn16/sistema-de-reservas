import professionalController from '../controllers/professionalController';
import { type ProfessionalBody, ProfessionalBodySchema, type FastifyTypedInstace } from '../types/types';
import { z } from 'zod';
import professionalValidation from '../validations/professionalValidation';

class professionalRoute {
	route(app: FastifyTypedInstace) {
		app.post<{Body: ProfessionalBody}>(
			'/professional',
			{
				preValidation: professionalValidation,
				schema: {
					summary: 'Cria um novo profissional',
					tags: ['Professional'],
					response: {
						201: z.object({
							message: z.string(),
						}),
						400: z.object({
							message: z.union([z.string(), z.array(z.string())]),
            }),
						500: z.object({
							message: z.string(),
            }),
					},
					body: ProfessionalBodySchema
				},
			},
			professionalController.create,
		);

		app.get('/professional/:id', {
			schema: {
        summary: 'Retorna um profissional pelo ID',
        tags: ['Professional'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
		}, professionalController.show)

		app.delete('/professional/:id', {
			schema: {
        summary: 'Deleta um profissional pelo ID',
        tags: ['Professional'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
		}, professionalController.delete)
	}
}

export default new professionalRoute().route;
