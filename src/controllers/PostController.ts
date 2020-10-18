import { Response, Request } from "express";
import GetPostsService from "../services/GetPostsService";
import CreatePostService from "../services/CreatePostService";
const mysql = require('mysql2/promise');

export default class PostController {
  /**
   * List posts.
   */
  public async list(request: any, response: Response): Promise<any> {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const getPosts = new GetPostsService(db);

    const data = await getPosts.handle();

    response.json({
      data: data,
    })
  }

  /**
   * Show one post.
   */
  public async show(request: any, response: Response): Promise<any> {
    response.json({
      id: 'b48dd43d-5b19-4bce-99a8-8ffabc52db84',
      title: 'My first post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies enim magna, aliquet tempor nunc congue vitae. Nunc convallis elementum accumsan. Proin sit amet blandit diam. Suspendisse condimentum congue suscipit. Phasellus id sodales augue. Sed massa nibh, feugiat vitae magna a, dignissim bibendum odio.',
      userId: 'b86bb437-eec6-4df2-9c39-800e68f84fac',
      createdAt: '2020-11-16T18:42:29+11:00',
      updatedAt: '2020-11-16T18:42:29+11:00',
      deletedAt: null,
    })
  }

  /**
   * Delete one post.
   */
  public async delete(request: any, response: Response): Promise<any> {
    response
      .status(204)
      .json(null);
  }

  /**
   * update one post.
   */
  public async update(request: any, response: Response): Promise<any> {
    response.json({
      id: 'b48dd43d-5b19-4bce-99a8-8ffabc52db84',
      title: 'My first post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies enim magna, aliquet tempor nunc congue vitae. Nunc convallis elementum accumsan. Proin sit amet blandit diam. Suspendisse condimentum congue suscipit. Phasellus id sodales augue. Sed massa nibh, feugiat vitae magna a, dignissim bibendum odio.',
      userId: 'b86bb437-eec6-4df2-9c39-800e68f84fac',
      createdAt: '2020-11-16T18:42:29+11:00',
      updatedAt: '2020-11-16T18:42:29+11:00',
      deletedAt: null,
    });
  }

  /**
   * Create one post.
   */
  public async create(request: Request, response: Response): Promise<any> {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const createPost = new CreatePostService(db);

    const data = await createPost.handle(request.body);

    response
      .status(201)
      .json({ id: data.insertId });
  }
}
