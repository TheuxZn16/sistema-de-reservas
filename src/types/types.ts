import type {
	FastifyBaseLogger,
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export type FastifyTypedInstace = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	FastifyBaseLogger,
	ZodTypeProvider
>;

export const ProfessionalBodySchema = z.object({
	email: z.string().email({message: 'O email precisa ser válido'}),
	password: z.string().min(8, {message: 'A senha deve ter no mínimo 8 caracteres'} ),
  name: z.string().min(3, {message: 'O nome deve ter no mínimo 3 caracteres'})
})

export type ProfessionalBody = z.infer<typeof ProfessionalBodySchema>
