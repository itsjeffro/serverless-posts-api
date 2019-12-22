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
  let defaults = {
    requestContext: {
      authorizer: {
        company: null,
        user: null,
        issuer: null
      }
    }
  };

  let handleEvent = Object.assign(defaults, event);

  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });
  
  let rows = await new Promise((resolve: any, reject: any) => {
    connection.execute("SELECT * FROM posts", (error: any, rows: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(rows);
    });
  });

  let authorizerContext = handleEvent.requestContext.authorizer;

  let data = {
    meta: {
      company: authorizerContext.company || "",
      user: authorizerContext.user || "",
      application: authorizerContext.issuer || ""
    },
    data: rows
  };
  
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

  console.log(event);

  const postId = 1;

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
      body: JSON.stringify({message: "Could not find record by ID"}),
    };
  }

  const data = {
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
  return {
    statusCode: 201,
    body: JSON.stringify({}),
  };
};

/**
 * Update a single post.
 */
module.exports.updatePost = async (event: object) => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

/**
 * Delete a single post.
 */
module.exports.deletePost = async (event: object) => {
  return {
    statusCode: 204,
    body: JSON.stringify(null),
  };
};