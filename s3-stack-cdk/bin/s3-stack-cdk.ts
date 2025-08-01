#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStackS3 } from '../lib/s3-stack-cdk-stack';

const app = new cdk.App();
new CdkStackS3(app, 'CdkStackS3', {});