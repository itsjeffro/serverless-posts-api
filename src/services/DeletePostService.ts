import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import LambdaEventInterface from "../lib/LambdaEvent/LambdaEventInterface";

class DeletePostService {
  /**
   * Database connection.
   */
  public db: any;

  /**
   * LambdaEvent.
   */
  public lambdaEvent: any;

  /**
   * GetPostsService constructor.
   */
  public constructor(db: object, lambdaEvent: LambdaEventInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Deletes one record.
   */
  async handle() {
    this.db.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });

    const postId = this.lambdaEvent.getPathParameter("uuid");

    let result = {
      affectedRows: 0,
      info: '',
    };

    result = await new Promise((resolve: any, reject: any) => {
      this.db.execute("DELETE FROM posts WHERE id = ? LIMIT 1", [postId], (error: any, results: any, fields: any) => {
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

export default DeletePostService;
