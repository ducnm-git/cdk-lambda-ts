


## initiation

```
npx node-venv set 22.17.0
npx node-venv activate
npm init -y
npm i -D aws-cdk aws-cdk-lib constructs \
  typescript ts-node @types/node
```

## Lambda using Typescript
```
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