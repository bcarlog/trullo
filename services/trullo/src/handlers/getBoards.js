import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function getBoards(event, context) {
    let boards

    try {
        const params = {
            TableName: process.env.BOARDS_TABLE_NAME,
            IndexName: 'statusIndex',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeValues: {
                ':status': 'ACTIVE',
            },
            ExpressionAttributeNames: {
                '#status': 'status'
            },
        }
        const result = await dynamodb.query(params).promise()

        boards = result.Items
    } catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(boards)
    }
}

export const handler = commonMiddleware(getBoards)


