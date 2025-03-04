import professionalController from '../controllers/professionalController';
import { type ProfessionalBody2, ProfessionalBodySchema, type FastifyTypedInstace } from '../types/types';
import { z } from 'zod';
import professionalValidation from '../validations/professionalValidation';

class professionalRoute {
	route(app: FastifyTypedInstace) {
		app.post<{Body: ProfessionalBody2}>(
			'/professional',
			{
				preValidation: professionalValidation.validate,
				schema: {
					summary: 'Cria um novo profissional',
					tags: ['Professional'],
					response: {
						201: z.object({
							message: z.string(),
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
