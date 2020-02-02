class RecordNotFoundException extends Error {
  /**
   * RecordNotFoundException constructor.
   *
   * @param {any} message 
   */
  constructor(message: any) {
    super(message);

    this.name = "RecordNotFoundException";
  }
}

export default RecordNotFoundException; 