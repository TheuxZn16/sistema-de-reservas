import type { FastifyTypedInstace } from '../types/types';
import homeController from '../controllers/homeController';
import { z } from 'zod';

class HomeRoute {
	route(app: FastifyTypedInstace) {
		app.get(
			'/',
			{
				schema: {
					summary: 'Retorna uma mensagem de boas-vindas',
					tags: ['Home'],
					response: {
						200: z.object({
							message: z.string(),
						}),
					},
				},
			},
			homeController.index,
		);
	}
}

export default new HomeRoute();
