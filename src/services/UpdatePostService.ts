import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import { ResultInterface } from "src/lib/Database/ResultInterface";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class UpdatePostService {
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
  async handle(postId: string, body: any): Promise<any> {
    this.db.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });
  
    const request = [
      body.title || null,
      body.slug || null,
      body.content || null,
      new Date,
    ];

    const result = await this.updatePostById(postId, request);

    return result;
  }

  /**
   * Updates post.
   */
  async updatePostById(id: string, request: any[]): Promise<ResultInterface | null> {
    const preparedParams = [
      ...request,
      id,
    ];

    const [ result ] = await this.db.execute(
      `UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = ? WHERE uuid = ? AND deleted_at IS NULL LIMIT 1`, 
      preparedParams
    );
  
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
 *   put:
 *     tags:
 *     - "posts"
 *     summary: "Updates a posts"
 *     description: ""
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: The UUID of the post
 *         required: true
 *         schema:
 *           type: string
 *           example: a2a8f957-c4b5-4e40-9a30-ab10cd962cbb
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
 *       200:
 *         description: ""
 *         content:
 *           application/json:
 *             example: 
 *               $ref: '#/definitions/schema/post'
 *       400:
 *         $ref: '#/definitions/responses/400'
 *       404:
 *         $ref: '#/definitions/responses/404'
 */
export default UpdatePostService;
