import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../utils";

export class dataStack extends Stack {
  public readonly spfinderTable: ITable

  constructor(scope: Construct, id: string, props?: StackProps){
    super(scope, id, props )

    const suffix = getSuffixFromStack(this);

    this.spfinderTable = new Table(this, 'spfinderTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: `spfinderTable-${suffix}`
    })
  }

}