import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";




export async function getHandler(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if (event.queryStringParameters) {
    if ('id' in event.queryStringParameters) {
      const spfinderId = event.queryStringParameters['id'];
      const getItemResponse = await ddbClient.send(new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          'id': { S: spfinderId }
        }
      }))
      if (getItemResponse.Item) {
        console.log(getItemResponse.Item)
        return {
          statusCode: 200,
          body: JSON.stringify(getItemResponse.Item)
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`sp with id ${spfinderId} is not found!`)
        }
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify('Id required!')
      }
    }
  }

  const result = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));
  console.log('[DEBUG] GET result: ' + result.Count + ' item(s); ' + JSON.stringify(result.Items));

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items)
  }
}