import { App } from "aws-cdk-lib";
import { dataStack } from "./stacks/data-stack";
import { lambdaStack } from "./stacks/lambda-stack";
import { apiStack } from "./stacks/apigw-stack";



const app = new App();
new dataStack(app, 'dataStack');
const myLambdaStack = new lambdaStack(app, 'myHelloLambdaStack');
new apiStack(app, 'apigwStack', { myLambdaIntegration: myLambdaStack.myLambdaFunctionIntegration});
