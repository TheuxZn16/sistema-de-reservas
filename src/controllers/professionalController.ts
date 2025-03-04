import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ProfessionalBody } from '../types/types';
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class professionalController {
	async create(request: FastifyRequest<{Body: ProfessionalBody}>, reply: FastifyReply) {
		const { name, email, password: passwordWithoutHash } = request.body;
    
    try {
      const password = await bcrypt.hash(passwordWithoutHash, 10);
      const newUser = { email, password, name}

      await prisma.professional.create({data: newUser})
      
      return reply.status(201).send({ message: 'Profissional criado com sucesso' });
    } catch (error) {
      return reply.status(500).send({ message: 'Erro ao criar novo profissional' })
    }
	}
}

export default new professionalController();
