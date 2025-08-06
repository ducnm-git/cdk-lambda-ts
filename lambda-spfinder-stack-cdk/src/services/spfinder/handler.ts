import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postHandler } from "./postHandler";
import { getHandler } from "./getHandler";
import { postHandlerWithDoc } from "./postHandlerWithDoc";
import { putHandler } from "./putHandler";
import { deleteHandler } from "./deleteHandler";
import { JsonError, missingFieldError } from "../shared/validator";

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
        const postResponse = await postHandler(event, ddbClient);
        return postResponse;
      case 'PUT':
        msg = 'Process PUT method';
        const putResponse = await putHandler(event, ddbClient);
        console.log(putResponse);
        return putResponse;
      case 'DELETE':
        msg = 'Process PUT method';
        const deleteResponse = await deleteHandler(event, ddbClient);
        console.log(deleteResponse);
        return deleteResponse;
      default:
        msg = 'Process ' + event.httpMethod + ' method';
        break;
    }
  } catch (error) {
    if (error instanceof missingFieldError || error instanceof JsonError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }

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