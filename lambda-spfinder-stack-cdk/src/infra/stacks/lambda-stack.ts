import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface lambdaStackProps extends StackProps {
  spfinderTable: ITable
}


export class lambdaStack extends Stack {
  public readonly myLambdaFunctionIntegration: LambdaIntegration;
  constructor(scope: Construct, id: string, props: lambdaStackProps) {
    super(scope, id, props)

    const myLambdaFunction = new NodejsFunction(this, 'helloLambda', {
      runtime: Runtime.NODEJS_LATEST,
      handler: 'handler',
      entry: join(__dirname, '..', '..', 'services', 'hello.ts'),
      environment: {
        TABLE_NAME: props.spfinderTable.tableName
      }
    })

    this.myLambdaFunctionIntegration = new LambdaIntegration(myLambdaFunction);
  }
}