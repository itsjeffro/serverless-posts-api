class Policy {
  dynamo: any;
  tableName: string = "";

  /**
   * Policy constructor.
   *
   * @param {any} dynamo
   */
  constructor(dynamo: any) {
    this.dynamo = dynamo;
  }

  /**
   * Set table.
   *
   * @param {string} tableName
   * @returns {this}
   */
  setTable(tableName: string): this {
    this.tableName = tableName;

    return this;
  }

  /**
   * Updates or creates a new record if it doesn't already exists.
   *
   * @param {any} policy
   * @returns {any}
   */
  async publish(policy: any) {
    const params = {
      TableName: this.tableName,
      Item: {
        "service_name_version": {
          S: "posts-v1"
         },
        "name": {
          S: "posts"
         },
        "version": {
          S: "v1"
         },
         "policy": {
          S: JSON.stringify(policy)
         }
       },
       ReturnConsumedCapacity: "TOTAL",
    };

    return await this.dynamo.putItem(params).promise();
  }
}

export default Policy;
