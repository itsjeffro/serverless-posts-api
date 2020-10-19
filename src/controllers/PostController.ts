import { Response, Request } from "express";
import GetPostsService from "../services/GetPostsService";
import CreatePostService from "../services/CreatePostService";
import GetPostService from "../services/GetPostService";
import DeletePostService from "../services/DeletePostService";
import UpdatePostService from "../services/UpdatePostService";
const mysql = require('mysql2/promise');

export default class PostController {
  /**
   * List posts.
   */
  public async list(request: Request, response: Response): Promise<any> {
    const db = await this.dbConnection();

    const getPosts = new GetPostsService(db);

    const data = await getPosts.handle();

    response.json({
      data: data.rows.map((row: any) => {
        return this.resource(row);
      })
    });
  }

  /**
   * Show one post.
   */
  public async show(request: Request, response: Response): Promise<any> {
    const db = await this.dbConnection();

    const getPost = new GetPostService(db);

    const postId = request.params.post;

    const row = await getPost.handle(postId);

    if (row === null) {
      return response
        .status(404)
        .json({
          message: `No query results for Ids: ${ postId }`,
        });
    }

    response.json(this.resource(row));
  }

  /**
   * Delete one post.
   */
  public async delete(request: Request, response: Response): Promise<any> {
    const db = await this.dbConnection();

    const deletePost = new DeletePostService(db);

    const postId = request.params.post;

    const row = await deletePost.handle(postId);

    if (row === null) {
      return response
        .status(404)
        .json({
          message: `No query results for Ids: ${ postId }`,
        });
    }

    response
      .status(204)
      .json(null);
  }

  /**
   * update one post.
   */
  public async update(request: Request, response: Response): Promise<any> {
    const db = await this.dbConnection();

    const updatePost = new UpdatePostService(db);

    const postId = request.params.post;

    const row = await updatePost.handle(postId, request.body);

    if (row === null) {
      return response
        .status(404)
        .json({
          message: `No query results for Ids: ${ postId }`,
        });
    }

    response.json({ id: row });
  }

  /**
   * Create one post.
   */
  public async create(request: Request, response: Response): Promise<any> {
    const db = await this.dbConnection();

    const createPost = new CreatePostService(db);

    const data = await createPost.handle(request.body);

    response
      .status(201)
      .json({ id: data.insertId });
  }

  /**
   * Post resource.
   */
  private resource(row: any): object {
    return {
      id: row.uuid,
      title: row.title,
      slug: row.slug,
      content: row.content,
      userId: null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: null,
    };
  }

  /**
   * Creates a new db connection.
   */
  public async dbConnection(): Promise<any> {
    const credentials = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };

    return await mysql.createConnection(credentials);
  }
}
