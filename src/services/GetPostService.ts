export default class GetPostService
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
   * GetPostService constructor.
   */
  public constructor(connection: object, lambdaEvent: any) {
    this.connection = connection;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Get one record.
   */
  public async getOne() {
    this.connection.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });
  
    const postId = this.lambdaEvent.getPathParameter('uuid');
  
    let rows: object[];
  
    rows = await new Promise((resolve: any, reject: any) => {
      this.connection.execute("SELECT * FROM posts WHERE uuid = ? LIMIT 1", [postId], (error: any, rows: any, fields: any) => {
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
        company: this.lambdaEvent.getRequestContext('authorizer.company'),
        user: this.lambdaEvent.getRequestContext('authorizer.user'),
        application: this.lambdaEvent.getRequestContext('authorizer.issuer'),
      },
      data: rows[0]
    };
  
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
}
