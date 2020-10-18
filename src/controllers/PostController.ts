import { Response } from "express";

export default class PostController {
  /**
   * List posts.
   */
  public list(request: any, response: Response): any {
    response.json({
      data: [],
    })
  }

  /**
   * Show one post.
   */
  public show(request: any, response: Response): any {
    response.json({
      title: "Example",
    })
  }

  /**
   * Delete one post.
   */
  public delete(request: any, response: Response): any {
    response
      .status(204)
      .json(null);
  }

  /**
   * update one post.
   */
  public update(request: any, response: Response): any {
    response.json({
      title: "Example updated",
    });
  }

  /**
   * Create one post.
   */
  public create(request: any, response: Response): any {
    response
      .status(201)
      .json({
        title: "Example created",
      });
  }
}
