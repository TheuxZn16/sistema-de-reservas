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
	}
}

export default new professionalRoute();
