import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface apiStackProps extends StackProps {
  spfinderIntegration : LambdaIntegration
}

export class apiStack extends Stack {
  constructor(scope: Construct, id: string, props: apiStackProps){
    super(scope, id, props);

    const api = new RestApi(this, 'apigw');
    const apigwResource = api.root.addResource('spfinder'); 
    apigwResource.addMethod('GET', props.spfinderIntegration);
    apigwResource.addMethod('POST', props.spfinderIntegration);
    apigwResource.addMethod('PUT', props.spfinderIntegration);
    apigwResource.addMethod('DELETE', props.spfinderIntegration);
    apigwResource.addMethod('ANY', props.spfinderIntegration);
  }
}