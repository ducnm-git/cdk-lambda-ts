import { handler } from "../src/services/spfinder/handler";

// For direct debug on local machine
// process.env.AWS_REGION = "us-east-1"
// process.env.TABLE_NAME = "spfinderTable-12082fe002b1"

// handler({
//   httpMethod: 'POST',
//   body: JSON.stringify({
//     location: "Vietnam"
//   })
// } as any, {} as any)


handler({
    httpMethod: 'GET',
  } as any, {} as any)