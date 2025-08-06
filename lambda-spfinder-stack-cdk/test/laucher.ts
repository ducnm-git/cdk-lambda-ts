import { handler } from "../src/services/spfinder/handler";

// For direct debug on local machine
process.env.AWS_REGION = "us-east-1"
process.env.TABLE_NAME = "spfinderTable-12082fe002b1"

// handler({
//   httpMethod: 'POST',
//   body: JSON.stringify({
//     location: "Vietnam"
//   })
// } as any, {} as any)


// handler({
//     httpMethod: 'GET',
//   } as any, {} as any)


// handler({
//   httpMethod: 'GET',
//   queryStringParameters: {
//     id: 'aa6eebc7-4b2e-4ece-9a85-cc0b316ca7cb'
//   }
// } as any, {} as any)


handler({
  httpMethod: 'PUT',
  queryStringParameters: {
    id: '2e6bb13b-be8c-43c5-ba53-c91a57ba2c54'
  },
  body: JSON.stringify({
    location: 'Eastern Laos'
  })
} as any, {} as any)
