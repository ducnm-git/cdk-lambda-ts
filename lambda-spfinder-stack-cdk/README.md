


## initiation

```BASH
npx node-venv set 22.17.0
npx node-venv activate
npm init -y
npm i -D aws-cdk aws-cdk-lib constructs \
  typescript ts-node @types/node
```

## Lambda using Typescript
```BASH
npm i -D @type/aws-lambda
npm i uuid @types/uuid
npm i -D esbuild
```

## AWS SDK
- `AWS-SDK` library that assists access AWS resources

JS SDK in the past: monolith

JS SDK v3: Breaked by services

- async and Ts support
- syntax change: client and commnad architecture

- `CDK v1`: Breaked into different services
- `CDK >v1`: monolith

```
npm i @aws-sdk/client-s3
```


## Enable node debug in VSCode
Required ts-node
`Ctrl + Shift + D` -> Create a lauch.json file -> select `Node.js`  -> `.vscode/launch.json`

```JSON
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    
    {
      "type": "node",
      "request": "launch",
      "name": "Debug local file",
      "cwd": "${workspaceFolder}/lambda-spfinder-stack-cdk",
      "program": "${workspaceFolder}/lambda-spfinder-stack-cdk/test/laucher.ts",
      "runtimeArgs": [
        "-r",
        "ts-node/register"
      ],
      "args": ["${relativeFile}"],
      "env": {
        "AWS_REGION" : "us-east-1"
      }
    }
  ]
}
```
## Direct run debug via command
Put environment in `lambda-spfinder-stack-cdk/test/laucher.ts`
```TS
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "spfinderTable-12082fe002b1"
```
and run:
```BASH
$ cd ./cdk-lambda-ts/lambda-spfinder-stack-cdk
$ npm exec ts-node test/laucher.ts
POST id = ebe3709f-bf84-4f3a-876a-872466a23acf; cmd result: {"$metadata":{"httpStatusCode":200,"requestId":"SDLDP5G0MO1LD5R3AQV42JHNRFVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0}}`
```

## Method Handler
`npm i @aws-sdk/client-dynamodb`

Fix for: 'TypeError: Cannot read properties of undefined (reading '0')'
`npm i @aws-sdk/util-dynamodb` mashall and unmashall
`npm i @aws-sdk/lib-dynamodb` DynamoDBDocumentClient

## Debug via Cloudwatch log group
Cloudwatch log group field map:
- Client header `x-amz-apigw-id: O0bjtEOSIAMEuVw=` is `requestContext.[].extendedRequestId`
- Client header `x-amzn-RequestId: acd2344f-13b4-4ec6-96aa-1278bd3b1db1` is `requestContext.[].requestId`


## Note
- Linux: `Ctrl + Shift + I` for reformat file in VSCode