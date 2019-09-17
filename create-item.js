var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    endpoint: "dynamodb.ap-south-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
addItem: function addItem(username, title, content){

    var table = "posts";

    var params = {
        TableName:table,
        Item:{
            "username": username,
            "title": [title],
            "content": [content]
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    }
}
