import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// PUT method handler; update record from DynamoDB


export async function putHandler(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


  if (event.queryStringParameters && ('id' in event.queryStringParameters) && event.body) {

    const parseBody = JSON.parse(event.body)
    const spfinderId = event.queryStringParameters['id'];
    const requestBodyKey = Object.keys(parseBody)[0];
    const requestBodyValue = parseBody[requestBodyKey];

    const updateResult = await ddbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': { S: spfinderId }
      },
      UpdateExpression: 'SET #location = :newLocation',
      ExpressionAttributeNames: {
        '#location': requestBodyKey
      },
      ExpressionAttributeValues: {
        ':newLocation': { S: requestBodyValue }
      },
      ReturnValues: 'UPDATED_NEW',

    }));
    return {
      statusCode: 204,
      body: JSON.stringify('[DEBUG] Updated: ' + JSON.stringify(updateResult.Attributes))
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify('[ERROR] Please provide right args!')
  }
}