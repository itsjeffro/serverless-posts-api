import ObjectRepository from "../ObjectRepository";

export default class LambdaEvent
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
  public getBody(key?: string) {
    if (typeof this.event.body !== 'string') {
      throw new Error('Event body must be a string type.');
    }

    const data = JSON.parse(this.event.body);

    return this.objectRepository.get(data, key);
  }
  
  /**
   * Returns value from event.pathParamters specified by the passed key. 
   */
  public getPathParameter(key?: string) {
    return this.objectRepository.get(
      this.event.pathParameters,
      key
    );
  }

  /**
   * Returns value from event.requestContext specified by the passed key. 
   */
  public getRequestContext(key?: string) {
    return this.objectRepository.get(
      this.event.requestContext,
      key
    );
  }
}
