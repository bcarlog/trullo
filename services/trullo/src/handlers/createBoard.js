import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import validator from '@middy/validator'
import createError from 'http-errors'

import createBoardsSchema from '../lib/schemas/createBoardSchema'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function createBoard(event, context) {
    const {title, photo, description, visibility } = event.body
    const now = new Date()

    const board = {
        id: uuid(),
        title,
        photo,
        description,
        visibility,
        status: 'ACTIVE',
        createAt: now.toISOString(),
    }

    try{
        await dynamodb.put({
            TableName: process.env.BOARDS_TABLE_NAME,
            Item: board,
        }).promise()
    }catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 201,
        body: JSON.stringify({board}),
    };
}

export const handler = commonMiddleware(createBoard)
    .use(validator({inputSchema: createBoardsSchema, useDefaults: true}))


