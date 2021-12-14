const cdk = require("@aws-cdk/core")
const apigw = require("@aws-cdk/aws-apigateway")
const lambda = require("@aws-cdk/aws-lambda")
const dynamodb = require("@aws-cdk/aws-dynamodb")
const s3 = require("@aws-cdk/aws-s3")
const iam = require("@aws-cdk/aws-iam")

class TodoBackendStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    // Todos section
    const api = new apigw.RestApi(this, "Api2", {
      description: "API dev",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      }
    })

    const todosDb = new dynamodb.Table(this, "Todos3", {
    	partitionKey: {name: "id", type: dynamodb.AttributeType.STRING}
    })

    const lambdaApi = new lambda.Function(this, "ApiFunc", {
      code: lambda.Code.fromAsset("handlers"),
      handler: "lambdaApi.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        TABLE_NAME: todosDb.tableName
      }
    })


    const todosEndp = api.root.addResource("todos")
    const todoAction = todosEndp.addResource("{id}")

    todosEndp.addMethod(
      "GET",
      new apigw.LambdaIntegration(lambdaApi)
    )
    todosEndp.addMethod(
      "POST",
      new apigw.LambdaIntegration(lambdaApi)
    )
    todoAction.addMethod(
      "DELETE",
      new apigw.LambdaIntegration(lambdaApi)
    )
    todoAction.addMethod(
      "PUT",
      new apigw.LambdaIntegration(lambdaApi)
    )

    
    // Images section
    const imgApi = new apigw.RestApi(this, "ImgApi", {
      description: "API dev",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: apigw.Cors.ALL_ORIGINS,
      }
    })

    const imagesDb = new dynamodb.Table(this, "Images", {
      partitionKey: {name: "id", type: dynamodb.AttributeType.STRING}
    })

    const lambdaImgs = new lambda.Function(this, "ImagesFunc", {
      code: lambda.Code.fromAsset("handlers"),
      handler: "imgApi.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        TABLE_NAME: imagesDb.tableName
      }
    })

    const imagesEndp = imgApi.root.addResource("images")

    imagesEndp.addMethod(
      "GET",
      new apigw.LambdaIntegration(lambdaImgs)
    )
    imagesEndp.addMethod(
      "POST",
      new apigw.LambdaIntegration(lambdaImgs)
    )
    // Images API

    todosDb.grantReadWriteData(lambdaApi)
    imagesDb.grantReadWriteData(lambdaImgs)

    new cdk.CfnOutput(this, "apiUrl", {value: api.url})
  }
}

module.exports = { TodoBackendStack }
