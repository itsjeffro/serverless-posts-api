export default class LambdaEvent
{
  public event = {
    body: '',
    pathParameters: null,
    requestContext: null,
  };

  public constructor(event: object) {
    this.event = Object.assign(this.event, event);
  }

  public getBody() {
    return JSON.parse(this.event.body);
  }
  
  public getPathParameters() {
    return this.event.pathParameters;
  }

  public getRequestContext() {
    return this.event.requestContext;
  }
}
