#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { S3StackCdkStack } from '../lib/s3-stack-cdk-stack';

const app = new cdk.App();
new S3StackCdkStack(app, 'S3StackCdkStack', {});