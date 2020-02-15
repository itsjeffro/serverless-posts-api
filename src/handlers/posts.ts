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

/**
 * @swagger
 *
 * /posts:
 *   get:
 *     tags:
 *     - "posts"
 *     summary: "Gets all posts"
 *     description: ""
 *     responses:
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example:
 *               -
 *                 $ref: '#/definitions/schema/post'
 */
module.exports.getPosts = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new GetPostsService(connection, lambdaEvent, new Log);

  return await service.getAll();
};

/**
 * @swagger
 *
 * /posts/{uuid}:
 *   get:
 *     tags:
 *     - "posts"
 *     summary: "Gets one post"
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the post
 *         required: true
 *         schema:
 *           type: string
 *           example: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
 *     responses:
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example:
 *               $ref: '#/definitions/schema/post'
 */
module.exports.getPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new GetPostService(connection, lambdaEvent);

  return await service.getOne();
};

/**
 * @swagger
 *
 * /posts:
 *   post:
 *     tags:
 *     - "posts"
 *     summary: "Creates a posts"
 *     description: ""
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: My post's content
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               $ref: '#/definitions/schema/post'
 *       400:
 *         $ref: '#/definitions/responses/400'
 */
module.exports.createPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const service = new CreatePostService(connection, lambdaEvent);

  return await service.createOne();
};

/**
 * @swagger
 *
 * /posts/{uuid}:
 *   put:
 *     tags:
 *     - "posts"
 *     summary: "Updates a posts"
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the post
 *         required: true
 *         schema:
 *           type: string
 *           example: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: My post's content
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               $ref: '#/definitions/schema/post'
 *       400:
 *         $ref: '#/definitions/responses/400'
 *       404:
 *         $ref: '#/definitions/responses/404'
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
 * @swagger
 *
 * /posts/{uuid}:
 *   delete:
 *     tags:
 *     - "posts"
 *     summary: "Deletes a posts"
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the post
 *         required: true
 *         schema:
 *           type: string
 *           example: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
 *     responses:
 *       204:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               null
 *       404:
 *         $ref: '#/definitions/responses/404'
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
