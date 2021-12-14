// const AWS = require("aws-sdk")
// const tableName = process.env.TABLE_NAME || ""
// const dynamo = new AWS.DynamoDB.DocumentClient()

exports.getAllTasks = async (tableName, db) => {
  const scanResult = await db.scan({
    TableName: tableName
  })
    .promise()
  return scanResult
}