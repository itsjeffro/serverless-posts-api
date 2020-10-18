import LambdaEvent from "../lib/LambdaEvent";
import ObjectRepository from "../lib/ObjectRepository";
import Logger from "../lib/Logger";

const awsServerlessExpress = require('aws-serverless-express');
const app = require('../app');

/**
 * @swagger
 *
 * definitions:
 *   schemas:
 *     post:
 *       uuid: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
 *       title: My first post
 *       content: My post's content
 *       created_at: 2020-02-09T04:11:57.379Z
 *       updated_at: 2020-02-09T04:11:57.379Z
 *
 *   responses:
 *      204:
 *        description: "Returns null when successfully deleted"
 *        example:
 *          null
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            example:
 *              message: "Problems parsing JSON"
 *      404:
 *        description: Unprocessable Entity
 *        content:
 *          application/json:
 *            example:
 *              message: "No results for table [posts] for ids: 00000000-0000-0000-0000-000000000000"
 */

const server = awsServerlessExpress.createServer(app);

exports.handler = (event: any, context: any) => {

  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const logger = new Logger(console);

  logger.debug(`Path: ${ lambdaEvent.getPath() }`);

  awsServerlessExpress.proxy(server, event, context);

};
