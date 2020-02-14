class BadRequestException extends Error {
    /**
     * BadRequestException constructor.
     *
     * @param {string} message
     */
    constructor(message: any) {
      super(message);
  
      this.name = "BadRequestException";
    }
  }
  
  export default BadRequestException; 