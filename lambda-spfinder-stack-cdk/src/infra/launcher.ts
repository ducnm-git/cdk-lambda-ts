import { App } from "aws-cdk-lib";
import { dataStack } from "./stacks/dynamodb-stack";
import { lambdaStack } from "./stacks/lambda-stack";
import { apiStack } from "./stacks/apigw-stack";



const app = new App();
const myDataStack = new dataStack(app, 'dataStack');
const myLambdaStack = new lambdaStack(app, 'spfinderLambdaStack', {
  spfinderTable: myDataStack.spfinderTable
});
new apiStack(app, 'apigwStack', { spfinderIntegration: myLambdaStack.spfinderLambdaIntegration});
