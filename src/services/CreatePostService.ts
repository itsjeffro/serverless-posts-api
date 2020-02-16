import LambdaEventInterface from "src/lib/LambdaEvent/LambdaEventInterface";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

const uuid = require("uuid/v4");

class CreatePostService {
  public db: DatabaseInterface;
  public lambdaEvent: LambdaEventInterface;

  /**
   * GetPostsService constructor.
   */
  public constructor(db: DatabaseInterface, lambdaEvent: LambdaEventInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Creates one recored.
   */
  public async handle() {
    const request = [
      uuid(),
      this.lambdaEvent.getBody('title'),
      this.lambdaEvent.getBody('slug'),
      this.lambdaEvent.getBody('content'),
      new Date,
      new Date,
    ];
  
    const [ result ] = await this.db.execute(
      `INSERT INTO posts (uuid, title, slug, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`, 
      request
    );
  
    return {
      insertId: result.insertId,
    };
  }
}

/**
 * @swagger
 *
 * /posts:
 *   post:
 *     tags:
 *     - "posts"
 *     summary: "Creates a posts"
 *     description: ""
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: My post's content
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               $ref: '#/definitions/schema/post'
 *       400:
 *         $ref: '#/definitions/responses/400'
 */
export default CreatePostService;
