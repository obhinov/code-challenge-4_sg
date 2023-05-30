const AWS = require('aws-sdk');
const dynamoDocClient = new AWS.DynamoDB.DocumentClient();

var response = {}; // returns data through schema format: {id, name, job}

const dynamoTable = process.env.TABLE_NAME;

exports.handler = async (event) => {
    console.log("Received event: ", JSON.stringify(event, 3));
    console.log(event.info.fieldName)
    try {
        if (event.info.fieldName=="getUserById"){
            response = await getUserById(event.arguments.userId);
            response = response.Item;
        }
        else {
            response = "No case";
        }
        
    } catch (e) {
        response = "error";
    }
    console.log(response);
    return response;
}

const getUserById = (item) => {
    return new Promise((resolve,reject) => {
        let params = {
            TableName: dynamoTable,
            Key :{
                id: item
            }
        };
    
        dynamoDocClient.get(params, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
