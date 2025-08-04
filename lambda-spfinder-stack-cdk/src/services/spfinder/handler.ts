import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let msg: string;
  switch (event.httpMethod) {
    case 'GET':
      msg = 'Process GET method';
      break;
    case 'POST':
      msg = 'Process POST method';
      break;
    default:
      msg = 'Process ' + event.httpMethod + ' method';
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(msg)
  }
  console.log(event);
  return response;
}

export { handler }