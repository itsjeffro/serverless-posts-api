import { LoggerInterface } from "src/lib/Log/LoggerInterface";

export default class GetPostsService
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
   * LambdaEvent.
   */
  public log: any;

  /**
   * GetPostsService constructor.
   */
  public constructor(connection: object, lambdaEvent: any, log: LoggerInterface) {
    this.connection = connection;
    this.lambdaEvent = lambdaEvent;
    this.log = log;
  }

  /**
   * Get all records.
   */
  public async getAll() {
    this.log.debug('Retrieving all posts.', {
      action: 'GET',
    });

    this.connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });
    
    const rows = await new Promise((resolve: any, reject: any) => {
      this.connection.execute("SELECT * FROM posts ORDER BY id DESC", (error: any, rows: any, fields: any) => {
        if (error) {
          throw error;
        }
  
        resolve(rows);
      });
    });
  
    const data = {
      meta: {
        company: this.lambdaEvent.getRequestContext('authorizer.company'),
        user: this.lambdaEvent.getRequestContext('authorizer.user'),
        application: this.lambdaEvent.getRequestContext('authorizer.issuer')
      },
      data: rows
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
}
