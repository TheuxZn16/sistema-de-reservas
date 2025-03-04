import app from './app';

app.listen({ port: Number(process.env.PORT) }).then(() => {
	console.log(
		`Rodando na porta ${process.env.PORT}, http://localhost:${process.env.PORT}`,
	);
});