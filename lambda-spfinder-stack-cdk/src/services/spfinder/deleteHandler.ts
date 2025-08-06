import { DeleteItemCommand, DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// DELETE method handler; delete record by Id from DynamoDB


export async function deleteHandler(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


  if (event.queryStringParameters && ('id' in event.queryStringParameters)) {

    const spfinderId = event.queryStringParameters['id'];

    const deleteResult = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': { S: spfinderId }
      }
    }));
    return {
      statusCode: 200,
      body: JSON.stringify('[DEBUG] Id: ' + spfinderId + ' Deleted: ' + JSON.stringify(deleteResult))
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify('[ERROR] Please provide right args!')
  }
}