const AWS = require('aws-sdk');
const dynamoDocClient = new AWS.DynamoDB.DocumentClient();

var response; // returns either true or false

const dynamoTable = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log("Received event: ", JSON.stringify(event, 3));
    try {
        if (event.info.fieldName=="deleteUser"){
            await deleteUser(event.arguments);
        }
        response = true;
        
    } catch (e) {
        console.log("Error: ", e)
        response = false;
    }
    console.log(response);
    return response;
};

const deleteUser = (item) => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable,
            Key: {
                id: item.id,
            }
        };
    
        dynamoDocClient.delete(params, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};