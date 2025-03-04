import type { FastifyReply, FastifyRequest } from "fastify";
import { ProfessionalBodySchema } from "../types/types";

class ProfessionalValidation{
  validate(request: FastifyRequest, reply: FastifyReply, done: () => void){
    const body = request.body;

    if(!body) return reply.status(400).send({ message: 'Credenciais não enviadas.'})
      
    const validated = ProfessionalBodySchema.safeParse(body) 
    if(!validated.success){ 
      const errorMessages = validated.error.errors.map(err => err.message)
      return reply.status(400).send({ message: errorMessages})
    }
    done()
  }
}

export default new ProfessionalValidation()