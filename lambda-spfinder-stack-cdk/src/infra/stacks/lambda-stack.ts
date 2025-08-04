import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface lambdaStackProps extends StackProps {
  spfinderTable: ITable
}


export class lambdaStack extends Stack {
  public readonly spfinderLambdaIntegration: LambdaIntegration;
  constructor(scope: Construct, id: string, props: lambdaStackProps) {
    super(scope, id, props)

    const spfinderLambda = new NodejsFunction(this, 'spfinderLambda', {
      runtime: Runtime.NODEJS_LATEST,
      handler: 'handler',
      entry: join(__dirname, '..', '..', 'services', 'spfinder', 'handler.ts'),
      environment: {
        TABLE_NAME: props.spfinderTable.tableName
      }
    });

    this.spfinderLambdaIntegration = new LambdaIntegration(spfinderLambda);
  }
}