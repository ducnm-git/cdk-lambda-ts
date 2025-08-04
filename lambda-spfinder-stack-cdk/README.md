


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

