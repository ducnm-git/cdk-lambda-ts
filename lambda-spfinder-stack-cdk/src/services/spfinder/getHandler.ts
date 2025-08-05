import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";




export async function getHandler(event:APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  const result = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));
  console.log('[DEBUG] GET result: ' + result.Count + ' item(s); ' + JSON.stringify(result.Items));

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items)
  }
}