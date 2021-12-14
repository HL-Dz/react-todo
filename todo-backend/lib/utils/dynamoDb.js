const dynamodb = require("@aws-cdk/aws-dynamodb")

exports.createDynamoDB = ({ app, key, tableName }) => {
  const db = new dynamodb.Table(app, tableName, {
    tableName: tableName,
    partitionKey: { name: key, type: dynamodb.AttributeType.STRING }
  })
  return db
}