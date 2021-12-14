const AWS = require("aws-sdk")
const tableName = process.env.TABLE_NAME || ""
const dynamo = new AWS.DynamoDB.DocumentClient()

const updateTask = async (data) => {
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

export { updateTask }