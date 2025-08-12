import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { User } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class authStack extends Stack {

  private userPool: UserPool;
  private userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createUserPool();
    this.createUserPoolClient();

  }

  private createUserPool() {
    this.userPool = new UserPool(this, 'sfinderUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true
      }
    });
    new CfnOutput(this, 'sfinderPoolId', {
      value: this.userPool.userPoolId
    })
  };
  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('sfinderUserPoolClient', {
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    });
    new CfnOutput(this, 'spfinderUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    })
  };

}