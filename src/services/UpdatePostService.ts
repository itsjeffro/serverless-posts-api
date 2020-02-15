import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import LambdaEventInterface from "../lib/LambdaEvent/LambdaEventInterface";

class UpdatePostService {
  /**
   * Database connection.
   */
  db: any;

  /**
   * LambdaEvent.
   */
  lambdaEvent: any;

  /**
   * GetPostsService constructor.
   */
  constructor(db: object, lambdaEvent: LambdaEventInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Creates one recored.
   */
  async handle() {
    this.db.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });

    const postId = this.lambdaEvent.getPathParameter("uuid");
  
    let requestData = [
      this.lambdaEvent.getBody('title') || "",
      this.lambdaEvent.getBody('slug') || "",
      this.lambdaEvent.getBody('content') || "",
      new Date,
      postId,
    ];
  
    let result = {
      affectedRows: 0
    };
  
    result = await new Promise((resolve: any, reject: any) => {
      this.db.execute("UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = ? WHERE uuid = ? LIMIT 1", requestData, (error: any, results: any, fields: any) => {
        if (error) {
          throw error;
        }
  
        resolve(results);
      });
    });
  
    if (result.affectedRows === 0) {
      throw new RecordNotFoundException(`No query results for IDs: ${postId}`);
    }

    return result;
  }
}

export default UpdatePostService;
