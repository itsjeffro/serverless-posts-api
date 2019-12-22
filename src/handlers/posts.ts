import GetPostsService from "../services/GetPostsService";
import LambdaEvent from "../lib/LambdaEvent";
import ObjectRepository from "../lib/ObjectRepository";

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

/**
 * Retrive posts.
 */
module.exports.getPosts = async (event: object) => {
  const lambdaEvent = new LambdaEvent(new ObjectRepository, event);
  const getPostsService = new GetPostsService(connection, lambdaEvent);

  const data = await getPostsService.getAll();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

/**
 * Retrive a single post.
 */
module.exports.getPost = async (event: object) => {
  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });

  const defaults = {
    requestContext: {
      authorizer: {
        company: null,
        user: null,
        issuer: null
      }
    },
    pathParameters: {
      uuid: null
    }
  };

  const handleEvent = Object.assign(defaults, event);
  const authorizerContext = handleEvent.requestContext.authorizer;
  const postId = handleEvent.pathParameters.uuid;

  let rows: object[];

  rows = await new Promise((resolve: any, reject: any) => {
    connection.execute("SELECT * FROM posts WHERE id = ? LIMIT 1", [postId], (error: any, rows: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(rows);
    });
  });

  if (rows.length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({message: `No query results for IDs: ${postId}`}),
    };
  }

  const data = {
    meta: {
      company: authorizerContext.company || "",
      user: authorizerContext.user || "",
      application: authorizerContext.issuer || ""
    },
    data: rows[0]
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

/**
 * Create a single post.
 */
module.exports.createPost = async (event: object) => {
  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });

  const defaults = {
    requestContext: {
      authorizer: {
        company: null,
        user: null,
        issuer: null
      }
    },
    pathParameters: {
      uuid: null
    },
    body: '',
  };

  const handleEvent = Object.assign(defaults, event);
  const authorizerContext = handleEvent.requestContext.authorizer;
  const body = JSON.parse(handleEvent.body);
  const requestData = [
    body.title || null,
    body.content || null,
    new Date,
  ];

  let result = {
    insertId: 0
  };

  result = await new Promise((resolve: any, reject: any) => {
    connection.execute("INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)", requestData, (error: any, results: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(results);
    });
  });

  const data = {
    meta: {
      company: authorizerContext.company || "",
      user: authorizerContext.user || "",
      application: authorizerContext.issuer || ""
    },
    data: {
      insertId: result.insertId,
    }
  };

  return {
    statusCode: 201,
    body: JSON.stringify(data),
  };
};

/**
 * Update a single post.
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
 * Delete a single post.
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