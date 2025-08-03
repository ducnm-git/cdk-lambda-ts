import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface apiStackProps extends StackProps {
  myLambdaIntegration : LambdaIntegration
}

export class apiStack extends Stack {
  constructor(scope: Construct, id: string, props: apiStackProps){
    super(scope, id, props);

    const api = new RestApi(this, 'apigw');
    const apigwResource = api.root.addResource('spfinder'); 
    apigwResource.addMethod('GET', props.myLambdaIntegration);
  }
}