import fastify from 'fastify';
import { Connection } from 'typeorm';

declare module 'fastify' {
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    db: Connection;
  }
}
