import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postHandler } from "./postHandler";
import { getHandler } from "./getHandler";
import { postHandlerWithDoc } from "./postHandlerWithDoc";
import { putHandler } from "./putHandler";

const ddbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let msg: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        msg = 'Process GET method';
        const getResponse = await getHandler(event, ddbClient);
        console.log(getResponse);
        return getResponse;
      case 'POST':
        msg = 'Process POST method';
        const postResponse = await postHandlerWithDoc(event, ddbClient);
        return postResponse;
      case 'PUT':
        msg = 'Process PUT method';
        const putResponse = await putHandler(event, ddbClient);
        console.log(putResponse);
        return putResponse;
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