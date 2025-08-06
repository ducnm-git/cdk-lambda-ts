import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateSpfEntry } from "../shared/validator";
import { marshall } from "@aws-sdk/util-dynamodb";




export async function postHandler(event:APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body);
  item.id = randomId;
  validateSpfEntry(item)

  const result = await ddbClient.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    Item: marshall(item)
  }));
  console.log('POST id = ' + randomId + '; cmd result: ' + JSON.stringify(result));

  return {
    statusCode: 201,
    body: JSON.stringify({id: randomId})
  }
}