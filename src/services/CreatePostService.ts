import DatabaseInterface from "src/lib/Database/DatabaseInteface";

const uuid = require("uuid/v4");

class CreatePostService {
  db: DatabaseInterface;

  /**
   * GetPostsService constructor.
   */
  constructor(db: DatabaseInterface) {
    this.db = db;
  }

  /**
   * Creates one recored.
   */
  async handle(body: any): Promise<any> {
    const request = [
      uuid(),
      body.title || null,
      body.slug || null,
      body.content || null,
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
