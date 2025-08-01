

import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class S3PhotoHandleCdkStack extends cdk.Stack {
  

  constructor(scope: Construct, id: string,props?: cdk.StackProps) {
    super(scope, id, props);

    const targetBucket = Fn.importValue('photo-bucket')

    new Function(this , 'PhotoHandler-Lambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: Code.fromInline(`
      exports.handler = async (event) => {
        console.log("Hello!: "+ process.env.TARGET_BUCKET)
        };
      `),
      environment: {
        TARGET_BUCKET: targetBucket,
      },
    });
  }
}