import { Response } from "express";

export default class VersionController {
  /**
   * Version information.
   */
  public show(request: any, response: Response): any {
    response.json({
      api: 'Posts and comments API',
      version: 1,
    });
  }
}
