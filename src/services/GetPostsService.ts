import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class GetPostsService {
  db: DatabaseInterface;

  /**
   * GetPostsService constructor.
   */
  constructor(db: DatabaseInterface) {
    this.db = db;
  }

  /**
   * Get all records.
   */
  async handle() {
    const [ rows ] = await this.db.execute(
      `SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY id DESC`
    );

    return {
      rows: rows
    };
  }
}

/**
 * @swagger
 *
 * /posts:
 *   get:
 *     tags:
 *     - "posts"
 *     summary: "Gets all posts"
 *     description: ""
 *     responses:
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example:
 *               -
 *                 $ref: '#/definitions/schema/post'
 */
export default GetPostsService;
