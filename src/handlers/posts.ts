import GetPostsService from "../services/GetPostsService";
import LambdaEvent from "../lib/LambdaEvent";
import ObjectRepository from "../lib/ObjectRepository";
import CreatePostService from "../services/CreatePostService";
import GetPostService from "../services/GetPostService";

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
  const getPostsService = new GetPostsService(connection, lambdaEvent);

  return await getPostsService.getAll();
};

/**
 * Get one record.
 */
module.exports.getPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const getPostService = new GetPostService(connection, lambdaEvent);

  return await getPostService.getOne();
};

/**
 * Create one record.
 */
module.exports.createPost = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const createPostService = new CreatePostService(connection, lambdaEvent);

  return await createPostService.createOne();
};

/**
 * Update one record.
 */
module.exports.updatePost = async (event: object) => {
  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });

  const defaults = {
    pathParameters: {
      uuid: null
    },
    body: '',
  };

  const handleEvent = Object.assign(defaults, event);
  const postId = handleEvent.pathParameters.uuid;
  const body = JSON.parse(handleEvent.body);

  let requestData = [
    body.title || null,
    body.content || null,
    new Date,
    postId,
  ];

  let result = {
    affectedRows: 0
  };

  result = await new Promise((resolve: any, reject: any) => {
    connection.execute("UPDATE posts SET title = ?, content = ?, updated_at = ? WHERE id = ? LIMIT 1", requestData, (error: any, results: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(results);
    });
  });

  if (result.affectedRows === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({message: `No query results for IDs: ${postId}`}),
    };
  }

  return {
    statusCode: 204,
    body: JSON.stringify(null),
  };
};

/**
 * Delete one record.
 */
module.exports.deletePost = async (event: object) => {
  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });

  const defaults = {
    pathParameters: {
      uuid: null
    }
  };

  const handleEvent = Object.assign(defaults, event);
  const postId = handleEvent.pathParameters.uuid;

  let result = {
    affectedRows: 0,
    info: '',
  };

  result = await new Promise((resolve: any, reject: any) => {
    connection.execute("DELETE FROM posts WHERE id = ? LIMIT 1", [postId], (error: any, results: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(results);
    });
  });

  if (result.affectedRows === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({message: `No query results for IDs: ${postId}`}),
    };
  }

  return {
    statusCode: 204,
    body: JSON.stringify(result),
  };
};
