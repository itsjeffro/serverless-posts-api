export default class CreatePostService
{
  /**
   * Database connection.
   */
  public connection: any;

  /**
   * LambdaEvent.
   */
  public lambdaEvent: any;

  /**
   * GetPostsService constructor.
   */
  public constructor(connection: object, lambdaEvent: any) {
    this.connection = connection;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Creates one recored.
   */
  public async createOne() {
    this.connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });
  
    const requestData = [
      this.lambdaEvent.getBody('title'),
      this.lambdaEvent.getBody('content'),
      new Date,
    ];
  
    let result = {
      insertId: 0
    };
  
    result = await new Promise((resolve: any, reject: any) => {
      this.connection.execute("INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)", requestData, (error: any, results: any, fields: any) => {
        if (error) {
          throw error;
        }
  
        resolve(results);
      });
    });
  
    const data = {
      meta: {
        company: this.lambdaEvent.getRequestContext('authorizer.company'),
        user: this.lambdaEvent.getRequestContext('authorizer.user'),
        application: this.lambdaEvent.getRequestContext('authorizer.issuer'),
      },
      data: {
        insertId: result.insertId,
      }
    };

    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  }
}
