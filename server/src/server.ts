import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { expressMiddleware as apolloExpressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import morgan from 'morgan';
import cors from 'cors';
import { expressjwt, Request } from 'express-jwt';
import { useServer as useWsServer } from 'graphql-ws/lib/use/ws';
import { createServer as createHttpServer } from 'http';
import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const server = async () => {
	app.use(
		morgan('dev'),
		cors(),
		express.json(),
		expressjwt({
			algorithms: ['HS256'],
			credentialsRequired: false,
			secret: JWT_SECRET_KEY
		})
	);

	// TODO: Create login route
	// app.get('/api/login', (_req: Request, res: Response) => {
	// 	bcrypt.compare(req.body.password, "")

	// 	res.status(200).json({
	// 		message: 'Hello there'
	// 	});
	// });

	const getHttpContext = ({ req }: { req: Request }) => {
		if (req.auth) {
			const { id } = req.auth;
			return { id };
		}
		return {};
	};

	const getWsContext = ({ connectionParams }: { connectionParams: { accessToken: string } }) => {
		console.log(connectionParams);
		const token = connectionParams?.accessToken;
		if (token) {
			const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
			return { id: payload.id };
		}
		return {};
	};

	const httpServer = createHttpServer(app);
	const wsServer = new WebSocketServer({ server: httpServer, path: '/api/graphql' });

	const schema = makeExecutableSchema({ typeDefs, resolvers });
	useWsServer({ schema, context: getWsContext }, wsServer);

	const apolloServer = new ApolloServer({ schema });
	await apolloServer.start();

	app.use(
		'/api/graphql',
		apolloExpressMiddleware(apolloServer, { context: getHttpContext as ContextFunction<[]> })
	);

	httpServer.listen({ port: PORT }, () => {
		console.log(`Server running on port ${PORT}`);
		console.log(`GraphQL endpoint: http://localhost:${PORT}/api/graphql`);
	});
};

server();
