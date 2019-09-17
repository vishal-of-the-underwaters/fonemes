var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    endpoint: "dynamodb.ap-south-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {
updateItem: function updateItem(username, title, content){
        var table = "posts";

        // Update the item, unconditionally,

        var params = {
            TableName:table,
            Key:{
                "username":username
            },
            UpdateExpression: "SET title = list_append(title, :i), content = list_append(content, :p) ",
            ExpressionAttributeValues:{
                ":i":[title],
                ":p":[content]
            },
            ReturnValues:"UPDATED_NEW"
        };

        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
}
