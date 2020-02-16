import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import LambdaEventInterface from "../lib/LambdaEvent/LambdaEventInterface";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class DeletePostService {
  db: DatabaseInterface;
  lambdaEvent: LambdaEventInterface;

  /**
   * GetPostsService constructor.
   */
  constructor(db: DatabaseInterface, lambdaEvent: LambdaEventInterface) {
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
      this.db.execute("DELETE FROM posts WHERE uuid = ? LIMIT 1", [postId], (error: any, results: any, fields: any) => {
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

/**
 * @swagger
 *
 * /posts/{uuid}:
 *   delete:
 *     tags:
 *     - "posts"
 *     summary: "Deletes a posts"
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the post
 *         required: true
 *         schema:
 *           type: string
 *           example: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
 *     responses:
 *       204:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               null
 *       404:
 *         $ref: '#/definitions/responses/404'
 */
export default DeletePostService;
