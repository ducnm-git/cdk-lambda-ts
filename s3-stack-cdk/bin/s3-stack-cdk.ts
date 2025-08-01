#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
// import { CdkStackS3 } from '../lib/s3-stack-cdk-stack';
import { S3PhotoCdkStack } from '../lib/s3-photo-cdk-stack';
import { S3PhotoHandleCdkStack } from '../lib/s3-photo-handle-cdk-stack';

const app = new cdk.App();
// new CdkStackS3(app, 'CdkStackS3', {});

const s3PhotoStack = new S3PhotoCdkStack(app, 'S3PhotoCdkStack');
new S3PhotoHandleCdkStack(app, 'S3PhotoHandleCdkStack', {
  targetBucketArn: s3PhotoStack.s3PhotoBucketArn
});