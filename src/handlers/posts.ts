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

  connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
    if (error) {
      throw error;
    }
  });
  
  const rows = await new Promise((resolve: any, reject: any) => {
    connection.execute("SELECT * FROM posts", (error: any, rows: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(rows);
    });
  });

  const authorizerContext = handleEvent.requestContext.authorizer;

  const data = {
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

  let result: string;

  result = await new Promise((resolve: any, reject: any) => {
    connection.execute("INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)", requestData, (error: any, results: any, fields: any) => {
      if (error) {
        throw error;
      }

      resolve(results.insertId);
    });
  });

  const data = {
    meta: {
      company: authorizerContext.company || "",
      user: authorizerContext.user || "",
      application: authorizerContext.issuer || ""
    },
    data: {
      insertId: result,
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