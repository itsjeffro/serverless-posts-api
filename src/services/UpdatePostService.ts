import RecordNotFoundException from "../lib/Database/RecordNotFoundException";
import LambdaEventInterface from "../lib/LambdaEvent/LambdaEventInterface";
import { ResultInterface } from "src/lib/Database/ResultInterface";
import DatabaseInterface from "src/lib/Database/DatabaseInteface";

class UpdatePostService {
  db: DatabaseInterface;
  lambdaEvent: LambdaEventInterface;

  /**
   * GetPostsService constructor.
   * 
   * @param {object} db
   * @param {LambdaEventInterface} lambdaEvent
   */
  constructor(db: DatabaseInterface, lambdaEvent: LambdaEventInterface) {
    this.db = db;
    this.lambdaEvent = lambdaEvent;
  }

  /**
   * Creates one recored.
   * 
   * @returns Promise<object>
   */
  async handle() {
    this.db.changeUser({ database: process.env.DB_DATABASE }, (error: any) => {
      if (error) {
        throw error;
      }
    });

    const id = this.lambdaEvent.getPathParameter("uuid");
  
    const request = [
      this.lambdaEvent.getBody('title'),
      this.lambdaEvent.getBody('slug'),
      this.lambdaEvent.getBody('content'),
      new Date,
    ];

    const result = await this.updatePostById(id, request);

    return result;
  }

  /**
   * Updates post.
   *
   * @param {string} id
   * @param {any[]} request
   * @returns {Promise<ResultInterface>}
   */
  async updatePostById(id: string, request: any[]): Promise<ResultInterface> {
    const preparedParams = [
      ...request,
      id,
    ];

    const [ result ] = await this.db.execute(
      `UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = ? WHERE uuid = ? AND deleted_at IS NULL LIMIT 1`, 
      preparedParams
    );
  
    if (result.affectedRows === 0) {
      throw new RecordNotFoundException(`No query results for IDs: ${id}`);
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
