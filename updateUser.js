const AWS = require('aws-sdk');
const dynamoDocClient = new AWS.DynamoDB.DocumentClient();

var response = false;

const dynamoTable = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log("Received event: ", JSON.stringify(event, 3));
    try {
        if (event.info.fieldName=="updateUser"){
            await updateUserInfo(event.arguments);
            response = true;
        }
        
    } catch (e) {
        console.log("Error: ", e);
    }
    console.log(response);
    return response;
};


const updateUserInfo = (item) => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable,
            Key: { id : item.id },
            UpdateExpression: 'set #a = :x, #b = :y',
            ExpressionAttributeNames: {'#a' : 'name', '#b': 'job'},
            ExpressionAttributeValues: {
                ':x' : item.name,
                ':y' : item.job
            }
        };
    
        dynamoDocClient.update(params, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}