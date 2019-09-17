var AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
  endpoint: "dynamodb.ap-south-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
fetchData: function fetchData(user){

    var table = "posts";

    var params = {
        TableName: table,
        Key:{
            "username": user
        }
    };
    var result='default';
    return docClient.get(params).promise();
}
}
