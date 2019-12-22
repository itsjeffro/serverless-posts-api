export default class LambdaEvent
{
  public event = {
    body: '',
    pathParameters: {},
    requestContext: {},
  };

  public objectRepository: any;

  public constructor(objectRepository: any, event: object) {
    this.event = Object.assign(this.event, event);
    this.objectRepository = objectRepository;
  }

  public getBody() {
    return JSON.parse(this.event.body);
  }
  
  public getPathParameter(key?: string) {
    return this.objectRepository.get(
      this.event.pathParameters,
      key
    );
  }

  public getRequestContext(key?: string) {
    return this.objectRepository.get(
      this.event.requestContext,
      key
    );
  }
}
