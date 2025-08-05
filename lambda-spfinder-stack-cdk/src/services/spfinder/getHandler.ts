import { DynamoDBClient, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";




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
        const ummashalledItem = unmarshall(getItemResponse.Item)
        return {
          statusCode: 200,
          body: JSON.stringify(ummashalledItem)
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
  const ummashalledItem = result.Items?.map(item => unmarshall(item))
  console.log('[DEBUG] GET result: ' + result.Count + ' item(s); ' + JSON.stringify(ummashalledItem));

  return {
    statusCode: 201,
    body: JSON.stringify(ummashalledItem)
  }
}