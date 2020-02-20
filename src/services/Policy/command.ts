import Policy from "./Policy";
import AWS from "aws-sdk";

const services = require("../../../config/services");
const policyJson = require("../../../policy.json");

(async () => {
  AWS.config.update(services.awsDynamoDB);

  const dynamo = new AWS.DynamoDB();
  const policy = new Policy(dynamo);

  try {
    const response = await policy
      .setTable("internal_service_policies")
      .publish(policyJson);

    if (response.ConsumedCapacity && response.ConsumedCapacity.TableName) {
      console.log(`Published policy to [${response.ConsumedCapacity.TableName}]`);

      process.exit(0);
    }

    throw new Error(`Response did not contain property [ConsumedCapacity]`);
  } catch(error) {
    console.log(error.message);

    process.exit(1);
  }
})();
