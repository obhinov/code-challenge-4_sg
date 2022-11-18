const AWS = require('aws-sdk');
const dynamoDocClient = new AWS.DynamoDB.DocumentClient();

var response = false;

const dynamoTable = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log("Received event: ", JSON.stringify(event, 3));
    try {
        if (event.info.fieldName=="createUser"){
            await createUser(event.arguments);
            response = true;
        }
        
    } catch (e) {
        console.log(e)
    }
    console.log(response);
    return response;
};

const createUser = (item) => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable,
            Item: item 
        };
    
        dynamoDocClient.put(params, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};