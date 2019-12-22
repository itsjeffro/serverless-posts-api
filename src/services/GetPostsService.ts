export default class GetPostsService
{
  public connection: any;
  public lambdaEvent: any;

  public constructor(connection: object, lambdaEvent: any) {
    this.connection = connection;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Returns all results.
   */
  public async getAll() {
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
  
    const requestContext = this.getRequestContext();
    
    return {
      meta: {
        company: requestContext.authorizer.company || "",
        user: requestContext.authorizer.user || "",
        application: requestContext.authorizer.issuer || ""
      },
      data: rows
    };
  }

  /**
   * Return request context.
   */
  public getRequestContext()
  {
    const requestContextDefaults =  {
      authorizer: {
        company: null,
        user: null,
        issuer: null,
      }
    };

    return Object.assign(requestContextDefaults, this.lambdaEvent.getRequestContext());
  }
}
