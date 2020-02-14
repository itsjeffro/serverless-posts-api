import LambdaEvent from "../lib/LambdaEvent";
import ObjectRepository from "../lib/ObjectRepository";
import Log from "../lib/Log";

import GetPostsService from "../services/GetPostsService";
import CreatePostService from "../services/CreatePostService";
import GetPostService from "../services/GetPostService";
import UpdatePostService from "../services/UpdatePostService";
import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import DeletePostService from "../services/DeletePostService";
import BadRequestException from "../lib/Http/BadRequestException";

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

/**
 * Get all records.
 */
module.exports.getPosts = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new GetPostsService(connection, lambdaEvent, new Log);

  return await service.getAll();
};

/**
 * Get one record.
 */
module.exports.getPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new GetPostService(connection, lambdaEvent);

  return await service.getOne();
};

/**
 * Create one record.
 */
module.exports.createPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new CreatePostService(connection, lambdaEvent);

  return await service.createOne();
};

/**
 * Update one record.
 */
module.exports.updatePost = async (event: object) => {
  let statusCode = null;
  let message = null;

  try {
    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new UpdatePostService(connection, lambdaEvent);

    statusCode = 200;
    message = {
      data: await service.handle()
    };
  } catch (e) {
    if (e instanceof BadRequestException) {
      statusCode = 400;
      message = { message: e.message };
    } else if (e instanceof RecordNotFoundException) {
      statusCode = 404;
      message = { message: e.message };
    } else {
      statusCode = 500;
      message = { message: e.message };
    }
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};

/**
 * Delete one record.
 */
module.exports.deletePost = async (event: object) => {
  let statusCode = null;
  let message = null;

  try {
    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new DeletePostService(connection, lambdaEvent);

    statusCode = 204;
    message = {
      data: await service.handle()
    };
  } catch (e) {
    if (e instanceof RecordNotFoundException) {
      statusCode = 404;
      message = { message: e.message };
    } else {
      statusCode = 500;
      message = { message: e.message };
    }
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};
