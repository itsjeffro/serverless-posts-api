import ObjectRepository from "../ObjectRepository";
import LambdaEventInterface from "./LambdaEventInterface";
import BadRequestException from "../Http/BadRequestException";

export default class LambdaEvent implements LambdaEventInterface
{
  /**
   * Defaults from the passed event.
   */
  public event = {
    body: '',
    pathParameters: {},
    requestContext: {},
  };

  /**
   * ObjectRepository.
   */
  public objectRepository: ObjectRepository;

  /**
   * LambdaEvent constructor.
   */
  public constructor(objectRepository: ObjectRepository, event: object) {
    this.event = {
      ...this.event,
      ...event
    };

    this.objectRepository = objectRepository;
  }

  /**
   * Returns parsed event.body.
   */
  public getBody(key?: string): object {
    try {
      const data = JSON.parse(this.event.body);

      return this.objectRepository.get(data, key);
    } catch (e) {
      throw new BadRequestException("Problems parsing JSON or is not an object");
    }
  }
  
  /**
   * Returns value from event.pathParamters specified by the passed key. 
   */
  public getPathParameter(key?: string): any {
    return this.objectRepository.get(
      this.event.pathParameters,
      key
    );
  }

  /**
   * Returns value from event.requestContext specified by the passed key. 
   */
  public getRequestContext(key?: string): any {
    return this.objectRepository.get(
      this.event.requestContext,
      key
    );
  }
}
