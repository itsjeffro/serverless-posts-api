import MigrationsQueue from "./MigrationsQueue";
import AWS from "aws-sdk";

(async () => {
  const config = {
    region: "",
    queueName: "",
    queueUrl: ""
  }

  AWS.config.update({
    region: config.region
  });

  const dynamo = new AWS.DynamoDB();
  const sqs = new AWS.SQS();

  const migrationsQueue = new MigrationsQueue(dynamo, sqs);

  await migrationsQueue
    .setTable("internal_tenants")
    .execute();
})();
