import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Handler, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";

export class lambdaStack extends Stack {
  public readonly myLambdaFunctionIntegration: LambdaIntegration;
  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props )

    const myLambdaFunction = new Function(this, 'helloLambda',{
      runtime: Runtime.NODEJS_LATEST,
      handler: 'hello.main',
      code: Code.fromAsset(join(__dirname, '..','..','services'))
    })

    this.myLambdaFunctionIntegration = new LambdaIntegration(myLambdaFunction);
  }
}