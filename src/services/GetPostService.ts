import LambdaEventInterface from "../lib/LambdaEvent/LambdaEventInterface";
import DatabaseInterface from "../lib/Database/DatabaseInteface";
import RecordNotFoundException from "../lib/Database/RecordNotFoundException";

class GetPostService {
  public db: DatabaseInterface;
  public lambdaEvent: LambdaEventInterface;

  /**
   * GetPostService constructor.
   */
  public constructor(db: DatabaseInterface, lambdaEvent: LambdaEventInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Get one record.
   */
  public async handle() {
    const id = this.lambdaEvent.getPathParameter('uuid');
  
    const [ rows ] = await this.db.execute(
      `SELECT * FROM posts WHERE uuid = ? LIMIT 1`, 
      [ id ]
    );
  
    if (rows.length === 0) {
      throw new RecordNotFoundException(`No query results for IDs: ${id}`);
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
