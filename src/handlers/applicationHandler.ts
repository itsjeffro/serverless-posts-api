import LambdaEvent from "../lib/LambdaEvent";
import ObjectRepository from "../lib/ObjectRepository";
import Logger from "../lib/Logger";

const app = require('../app');
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event: any, context: any) => {

  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const logger = new Logger(console);

  logger.debug(`Path: ${ lambdaEvent.getPath() }`);

  awsServerlessExpress.proxy(server, event, context);

};
