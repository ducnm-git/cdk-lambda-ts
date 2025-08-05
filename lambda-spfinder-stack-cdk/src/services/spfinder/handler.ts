import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postHandler } from "./postHandler";

const ddbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let msg: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        msg = 'Process GET method';
        break;
      case 'POST':
        msg = 'Process POST method';
        const response = postHandler(event, ddbClient);
        return response;
      default:
        msg = 'Process ' + event.httpMethod + ' method';
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }



  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(msg)
  }
  console.log(event);
  return response;
}

export { handler }