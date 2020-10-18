import DatabaseInterface from "../lib/Database/DatabaseInteface";
import RecordNotFoundException from "../lib/Database/RecordNotFoundException";

class GetPostService {
  db: DatabaseInterface;

  /**
   * GetPostService constructor.
   */
  constructor(db: DatabaseInterface) {
    this.db = db;
  }

  /**
   * Get one record.
   */
  async handle(postId: string) {
    const [ rows ] = await this.db.execute(
      `SELECT * FROM posts WHERE uuid = ? LIMIT 1`, 
      [ postId ]
    );
  
    if (rows.length === 0) {
      return null;
    }
  
    return rows[0];
  }
}

/**
 * @swagger
 *
 * /posts/{uuid}:
 *   get:
 *     tags:
 *     - "posts"
 *     summary: "Gets one post"
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
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example:
 *               $ref: '#/definitions/schema/post'
 */
export default GetPostService;
