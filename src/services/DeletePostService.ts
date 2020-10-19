import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class DeletePostService {
  db: DatabaseInterface;

  /**
   * GetPostsService constructor.
   */
  constructor(db: DatabaseInterface) {
    this.db = db;
  }

  /**
   * Deletes one record.
   */
  async handle(postId: string): Promise<any | null> {
    this.db.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });

    const [ result ] = await this.db.execute("DELETE FROM posts WHERE uuid = ? LIMIT 1", [ postId ]);

    if (result.affectedRows === 0) {
      return null;
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
