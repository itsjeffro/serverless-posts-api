interface LambdaEventInterface {
  /**
   * @param {string} key
   * @returns {any}
   */
  getBody(key: string): any;

  /**
   * @param {string} key
   * @returns {any}
   */
  getPathParameter(key: string): any;

  /**
   * @param {string} key
   * @returns {any}
   */
  getRequestContext(key: string): any;
}

export default LambdaEventInterface;
