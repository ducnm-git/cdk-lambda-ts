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
  /**
   * Constructs a new S3 stack with three different S3 bucket creation approaches:
   * 
   * 1. **L1 (CfnBucket):** Creates a low-level CloudFormation S3 bucket resource with a lifecycle rule that expires objects after 2 days.
   * 2. **L2 (Bucket):** Creates a higher-level CDK S3 bucket with a lifecycle rule for 2-day expiration, outputs the bucket name.
   * 3. **L3 (L3Bucket):** Demonstrates a custom construct (L3) for S3 bucket creation.
   * 
   * @param scope The parent construct.
   * @param id The unique identifier for this stack.
   * @param props Optional stack properties.
   */
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


    const duration = new cdk.CfnParameter(this, 'Duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'});

    // Construction Layer 2
    const myL2Bucket = new Bucket(this, 'my-l2-bucket', {
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }]
    });



    console.log('L2 bucket name: ' + myL2Bucket.bucketName)
    new cdk.CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    });
    


    // Construction Layer 3
    new L3Bucket(this, 'my-l3-bucket', 3);
  }
}

