class MigrationsQueue {
  dynamo: any;
  sqs: any;
  tableName: string = "";

  /**
   * MigrationsQueue constructor.
   *
   * @param {any} dynamo 
   * @param {any} sqs 
   */
  constructor(dynamo: any, sqs: any) {
    this.dynamo = dynamo;
    this.sqs = sqs;
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
   * Executes creating messages for each item retrieved from DynamoDB.
   * 
   * @returns {void}
   */
  async execute(): Promise<void> {
    const params = {
      TableName: this.tableName
    };

    const dynamo = await this.dynamo.scan(params).promise();

    if (dynamo.Items.length === 0) {
      console.log(`No items inside table [${this.tableName}] and stopping process.`);

      this.stop();
    }

    for (let i = 0; i < dynamo.Items.length; i++) {
      const item = dynamo.Items[i];
      const tenantName = item.tenant_name.S;
      const database = item.database.S;

      const message = await this.createQueueFromDatabase(database);

      console.log(database);
      console.log(message);
    }
  }

  /**
   * Create message in SQS queue with passed database name.
   * 
   * @param {string} database
   * @returns {object}
   */
  async createQueueFromDatabase(database: string): Promise<object> {
    return await this.sqs.sendMessage({
      MessageBody: "{\"database\": \"" + database + "\"}",
      QueueUrl: "",
    }).promise();
  }

  /**
   * Stop process.
   *
   * @param {number} code
   * @returns {void}
   */
  stop(code: number = 0): void {
    process.exit(code);
  }
}

export default MigrationsQueue;
