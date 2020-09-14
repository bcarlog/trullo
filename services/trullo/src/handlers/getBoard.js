import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export async function getBoardById(id) {
    let board

    try{
        const result = await dynamodb.get({
            TableName: process.env.BOARDS_TABLE_NAME,
            Key: { id }
        }).promise()

        board = result.Item
    }catch(error){
        console.error(error)
        throw new createError.InternalServerError(error)
    }

    if(!board){
        throw new createError.NotFound(`Board with ID "${id} not found!`)
    }

    return board
}

async function getBoard(event, context) {
    const { id } = event.pathParameters

    let board = await getBoardById(id)

    return {
        statusCode: 200,
        body: JSON.stringify(board)
    }
}

export const handler = commonMiddleware(getBoard)