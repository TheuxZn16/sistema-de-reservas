import type { FastifyReply, FastifyRequest } from "fastify";
import { type ProfessionalBody, ProfessionalBodySchema } from "../types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class ProfessionalValidation{
  async validate(request: FastifyRequest<{Body: ProfessionalBody}>, reply: FastifyReply, done: () => void){
    const body = request.body;

    if(!body) return reply.status(400).send({ message: 'Credenciais não enviadas.'})
      
    const validated = ProfessionalBodySchema.safeParse(body) 
    if(!validated.success){ 
      const errorMessages = validated.error.errors.map(err => err.message)
      return reply.status(400).send({ message: errorMessages})
    }
    try{
      const emailExists = await prisma.professional.findUnique({where: {email: body.email}})

      if(emailExists) return reply.status(400).send({ message: 'Email já cadastrado.'})

      done()
    } catch(err){
      return reply.status(500).send({ message: 'Erro ao verificar email existente' })
    }
     

    
  }
}

export default new ProfessionalValidation().validate