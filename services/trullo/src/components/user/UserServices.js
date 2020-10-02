import AWS from 'aws-sdk'
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export const createUser = async (card) => {
    try {
        return await dynamodb.put({
            TableName: process.env.USERS_TABLE_NAME,
            Item: card,
        }).promise()
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getUserByEmail = async(email) => {
    let user = null

    try{
        const params = {
            TableName: process.env.USERS_TABLE_NAME,
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
        }
        const result = await dynamodb.query(params).promise()
        if(result.Items.length > 0){
            user = result.Items[0]
        }
    }catch(error){
        console.error(error)
        throw new createError.InternalServerError(error)
    }

    return user
}

export const getUsers = async() =>{
    try {
        const result = await dynamodb.scan({
            TableName: process.env.USERS_TABLE_NAME
        }).promise()
        return result.Items
    } catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}