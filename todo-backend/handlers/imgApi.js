const AWS = require("aws-sdk")
const tableName = process.env.TABLE_NAME || ""
const dynamo = new AWS.DynamoDB.DocumentClient()


const createResponse = (body, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
}


const getAllImages = async () => {
  const result = await dynamo.scan({
    TableName: tableName
  })
    .promise()
  return result
}

const addImg = async (data) => {
  await dynamo.put({
    TableName: tableName,
    Item: {...data}
  })
    .promise()
  return data
}


exports.handler = async function( event ) {
  const {httpMethod, body: requestBody, pathParameters} = event

  if(httpMethod === "GET") {
    const res = await getAllImages()
    return createResponse(res.Items || [])
  }

  if(!requestBody) {
    return createResponse("Missing request body", 500)
  }

  const data = JSON.parse(requestBody)

  if(httpMethod === "POST") {
    const imgObj = await addImg(data)
    return imgObj ? createResponse(imgObj, 200) : createResponse("Image is missing", 500)
  }
}