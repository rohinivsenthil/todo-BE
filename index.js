const routes = require('./src/router/routes');
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const dbPlugin = require('./src/plugin');

const server = Hapi.Server({
	host: '0.0.0.0',
	port: 8080,
	routes: {
		cors: true
	}
});

server.validator(Joi);
server.route(routes);

const registerPlugin = async () => {
	await server.register(dbPlugin);
	await server.start();
};

registerPlugin();
console.log('Server started');