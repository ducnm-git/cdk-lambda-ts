

import * as cdk from 'aws-cdk-lib';
import { Fn, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class S3PhotoCdkStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly s3PhotoBucketArn: string;

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    this.stackSuffix = Fn.select(4, Fn.split('-',shortStackId))
  }

  constructor(scope: Construct, id: string,props?: cdk.StackProps) {
    super(scope, id, props);
    this.initializeSuffix();
    const myS3PhotoBucket = new Bucket(this, 'S3PhotoBucket', {
      bucketName: `s3-photo-bucket-${this.stackSuffix}`,
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
    this.s3PhotoBucketArn = myS3PhotoBucket.bucketArn
  }
}