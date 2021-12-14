const AWS = require("aws-sdk")
const tableName = process.env.TABLE_NAME || ""
const dynamo = new AWS.DynamoDB.DocumentClient()

const addTask = async (data) => {
  await dynamo.put({
    TableName: tableName,
    Item: {...data}
  })
    .promise()
  return data
}

export {addTask}