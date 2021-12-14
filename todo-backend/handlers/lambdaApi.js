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

const getAllTasks = async () => {
  const scanResult = await dynamo.scan({
    TableName: tableName
  })
    .promise()

  return scanResult
}

const addTask = async ( data ) => {
  await dynamo.put({
    TableName: tableName,
    Item: {...data}
  })
    .promise()
  return data
}

const deleteTask = async (id) => {
  if(id && id !== "") {
    await dynamo.delete({
      TableName: tableName,
      Key: {
        id: id
      }
    })
      .promise()
  }

  return id
}

const updateTask = async ( data ) => {
  const { id, completed } = data
  await dynamo.update({
    TableName: tableName,
    Key: {
      id,
    },
    UpdateExpression: "SET completed = :completed",
    ExpressionAttributeValues: {
      ":completed": data.completed
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return JSON.stringify(data)
}

exports.handler = async function( event ) {
  const {httpMethod, body: requestBody, pathParameters} = event

  if(httpMethod === "GET") {
    const response = await getAllTasks()
    return createResponse(response.Items || [])
  }

  if(!requestBody) {
    return createResponse("Missing request body", 500)
  }
  const data = JSON.parse(requestBody)

  if(httpMethod === "POST") {
    const todo = await addTask(data)
    return todo ? createResponse(todo, 200) : createResponse("Todo is missing", 500)
  }
  if( httpMethod === "PUT" ) {
    data.id = pathParameters?.id
    const dataElem = await updateTask(data)
    return dataElem ? createResponse(dataElem) : createResponse("ID is missing", 500)
  }
  if( httpMethod === "DELETE" ) {
    if(pathParameters?.id){
      const id = await deleteTask(pathParameters.id)
      return id ? createResponse(id) : createResponse("ID is missing", 500)
    }
  }
}
