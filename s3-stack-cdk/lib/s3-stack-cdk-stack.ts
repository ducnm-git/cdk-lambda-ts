import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { LifecyclePolicy } from 'aws-cdk-lib/aws-efs';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number){
    super(scope, id);
    
    new Bucket(this, 'my-l3-bucket', {
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }]
    })
  }
};

export class CdkStackS3 extends cdk.Stack {
  constructor(scope: Construct, id: string , props?: cdk.StackProps) {
    super(scope, id, props);

    // create an S3 bucket 3 ways
    new CfnBucket(this, 'my-l1-bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 2,
          status: 'Enabled'
        }]
      }
    });

    // Construction Layer 2
    new Bucket(this, 'my-l2-bucket', {
      lifecycleRules: [{
        expiration: Duration.days(2)
      }]
    });

    // Construction Layer 3
    new L3Bucket(this, 'my-l3-bucket', 3);
  }
}

