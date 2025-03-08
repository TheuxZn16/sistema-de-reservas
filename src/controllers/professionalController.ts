import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ProfessionalBody } from '../types/types';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class professionalController {
	async create(
		request: FastifyRequest<{ Body: ProfessionalBody }>,
		reply: FastifyReply,
	) {
		const { name, email, password: passwordWithoutHash } = request.body;

		try {
			const password = await bcrypt.hash(
				passwordWithoutHash,
				process.env.HASH as string,
			);
			const newUser = { email, password, name };

			await prisma.professional.create({ data: newUser });

			return reply
				.status(201)
				.send({ message: 'Profissional criado com sucesso' });
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Erro ao criar novo profissional' });
		}
	}

	async show(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const id = Number(request.params.id);
		if (!id) return reply.status(400).send({ message: 'Id não enviado' });

		try {
			const data = await prisma.professional.findUnique({
				where: { id },
			});

			if (!data)
				return reply
					.status(404)
					.send({ message: 'Profissional não encontrado' });

			const { password, ...professional } = data;

			return reply.status(200).send(professional);
		} catch (error) {
			return reply
				.code(500)
				.send({ message: 'Erro ao encontrar profissional' });
		}
	}

	async delete(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const id = Number(request.params.id);

		if (!id) return reply.status(400).send({ message: 'Id não enviado' });

		try {
			await prisma.professional.delete({ where: { id } });
			return reply
				.status(204)
				.send({ message: 'Profissional deletado com sucesso' });
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Erro ao deletar profissional' });
		}
	}
}

export default new professionalController();
