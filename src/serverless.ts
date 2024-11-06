import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context } from 'aws-lambda';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { createServer, proxy } from "aws-serverless-express";
import express from 'express';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import bodyParser from 'body-parser';

let cacheServer: Server;

process.on("unhandledRejection", (reason) => {
  console.error(reason);
});

process.on("uncaughtException", (reason) => {
  console.error(reason);
});

const binaryMineTypes: string[] = [];

async function bootstrap() {
if(!cacheServer){
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.use(cookieParser());

  app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
  }));

  app.use(bodyParser.json({
      limit: '5mb'
  }));

  // app.use(eventContext());
  app.enableCors(
    {
      credentials: true,
    }
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.init();
  cacheServer = createServer(expressApp, undefined, binaryMineTypes);
}
return cacheServer;
}

export const handler: Handler = async (
    event: any,
    context: Context
) => {

  console.log(event.path);
  if (event.path === '/api') {
    console.log(event.path);
    event.path = '/api/';
  }

  event.path = event.path.includes('swagger-ui') ? `/api${event.path}` : event.path;
  cacheServer = await bootstrap();
    return proxy(cacheServer, event, context, 'PROMISE').promise;
};
