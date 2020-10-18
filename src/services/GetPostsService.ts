import { LoggerInterface } from "src/lib/Logger/LoggerInterface";
import LambdaEventInterface from "src/lib/LambdaEvent/LambdaEventInterface";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class GetPostsService {
  db: DatabaseInterface;
  lambdaEvent: LambdaEventInterface;
  log: LoggerInterface;

  /**
   * GetPostsService constructor.
   */
  constructor(db: DatabaseInterface, lambdaEvent: LambdaEventInterface, log: LoggerInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
    this.log = log;
  }

  /**
   * Get all records.
   */
  async handle() {
    const [ rows ] = await this.db.execute(
      `SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY id DESC`
    );

    return {
      data: rows
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
