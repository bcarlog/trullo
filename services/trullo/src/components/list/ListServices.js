import AWS from 'aws-sdk'
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export const createList = async (list) => {

    const oldLists = await getLists(list.boardId)
    const newList = {
        ...list,
        order: oldLists.length + 1
    }

    try {
        return await dynamodb.put({
            TableName: process.env.LISTS_TABLE_NAME,
            Item: newList,
        }).promise()
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getLists = async (boardId) => {
    try {
        const params = {
            TableName: process.env.LISTS_TABLE_NAME,
            IndexName: 'boardIdIndex',
            KeyConditionExpression: "boardId = :boardId",
            ExpressionAttributeValues: {
                ":boardId": boardId
            }
        };
        const result = await dynamodb.query(params).promise()
        return result.Items
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}