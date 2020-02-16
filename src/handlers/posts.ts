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

const mysql = require('mysql2/promise');

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
 * Gets all posts.
 * 
 * @param {object} event
 * @returns {object}
 */
module.exports.getPosts = async (event: object) => {
  const db = await connection;
  const database = process.env.DB_DATABASE;

  try {
    console.log(`Changing database...`);

    await db.changeUser({ database: database });

    console.log(`Changed to databse [${database}]`);

    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new GetPostsService(await db, lambdaEvent, new Log);

    return {
      statusCode: 200,
      body: JSON.stringify(await service.handle())
    }
  } catch (error) {
    console.log(error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Oops! Something went wrong" })
    }
  }
};

/**
 * Gets a post.
 * 
 * @param {object} event
 * @returns {object}
 */
module.exports.getPost = async (event: object) => {
  const db = await connection;
  const database = process.env.DB_DATABASE;

  try {
    console.log(`Changing database...`);

    await db.changeUser({ database: database });

    console.log(`Changed to databse [${database}]`);

    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new GetPostService(db, lambdaEvent);

    return {
      statusCode: 200,
      body: JSON.stringify(await service.handle())
    }
  } catch (error) {
    console.log(error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Oops! Something went wrong" }),
    };
  }
};

/**
 * Creates a post.
 * 
 * @param {object} event
 * @returns {object}
 */
module.exports.createPost = async (event: object) => {
  const db = await connection;
  const database = process.env.DB_DATABASE;

  try {
    console.log(`Changing database...`);

    await db.changeUser({ database: database });

    console.log(`Changed to databse [${database}]`);

    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new CreatePostService(await connection, lambdaEvent);

    return {
      statusCode: 201,
      body: JSON.stringify(await service.handle()),
    };
  } catch (error) {
    console.log(error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Oops! Something went wrong" }),
    };
  }
};

/**
 * Updates a post.
 * 
 * @param {object} event
 * @returns {object}
 */
module.exports.updatePost = async (event: object) => {
  const db = await connection;
  const database = process.env.DB_DATABASE;

  try {
    console.log(`Changing database...`);

    await db.changeUser({ database: database });

    console.log(`Changed to databse [${database}]`);

    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new UpdatePostService(db, lambdaEvent);

    return {
      statusCode: 200,
      body: JSON.stringify(await service.handle())
    }
  } catch (e) {
    let statusCode = null;
    let message = null;

    if (e instanceof BadRequestException) {
      statusCode = 400;
      message = { message: e.message };
    } else if (e instanceof RecordNotFoundException) {
      statusCode = 404;
      message = { message: e.message };
    } else {
      statusCode = 500;
      message = { message: "Oops! Something went wrong" };
    }

    console.log(e.message);

    return {
      statusCode: statusCode,
      body: JSON.stringify(message),
    };
  }
};

/**
 * Deletes a post.
 * 
 * @param {object} event
 * @returns {object}
 */
module.exports.deletePost = async (event: object) => {
  const db = await connection;
  const database = process.env.DB_DATABASE;

  try {
    console.log(`Changing database...`);

    await db.changeUser({ database: database });

    console.log(`Changed to databse [${database}]`);

    const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
    const service = new DeletePostService(db, lambdaEvent);

    return {
      statusCode: 204,
      body: JSON.stringify(await service.handle())
    }
  } catch (e) {
    let statusCode = null;
    let message = null;

    if (e instanceof RecordNotFoundException) {
      statusCode = 404;
      message = { message: e.message };
    } else {
      statusCode = 500;
      message = { message: "Oops! Something went wrong" };
    }

    console.log(e.message);

    return {
      statusCode: statusCode,
      body: JSON.stringify(message),
    };
  }
};
