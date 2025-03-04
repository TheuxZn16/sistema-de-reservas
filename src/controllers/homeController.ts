import type { FastifyReply, FastifyRequest } from 'fastify';

class HomeController {
	async index(request: FastifyRequest, reply: FastifyReply) {
		return reply.status(200).send({ message: 'Hello World' });
	}
}

export default new HomeController();
