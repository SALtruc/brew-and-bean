// DynamoDB DocumentClient — runs only on the server (API route).
// On EC2, credentials should come from an IAM role attached to the instance.
// For local dev, set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local.

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION || 'ap-southeast-1';

const client = new DynamoDBClient({ region });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = process.env.DYNAMODB_ORDERS_TABLE || 'CoffeeOrders';

export async function putOrder(order) {
  const command = new PutCommand({
    TableName: TABLE,
    Item: order,
  });
  await ddb.send(command);
}
