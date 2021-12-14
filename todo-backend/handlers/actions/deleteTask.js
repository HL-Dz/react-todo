const AWS = require("aws-sdk")
const tableName = process.env.TABLE_NAME || ""
const dynamo = new AWS.DynamoDB.DocumentClient()

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

export { deleteTask }