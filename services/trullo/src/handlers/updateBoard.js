import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware'
import createError from 'http-errors'
import { getBoardById } from './getBoard'
const _ = require('lodash');

const dynamodb = new AWS.DynamoDB.DocumentClient()

var skipNullAttributes = (attributes) => {
    return _.omitBy(attributes, (attr) => {
        return _.isNil(attr.Value);
    });
}

async function updateBoard(event, context) {
    const { id } = event.pathParameters
    const { title, description } = event.body

    const board = await getBoardById(id) // Check if exists

    if(board.status !== 'ACTIVE'){
        throw new createError(`You cann't update on boards inactives`)
    }

    if (!title && !description) {
        throw new createError.Forbidden('Needs a title or description')
    }

    var attributes = {
        title: { Action: 'PUT', Value: title },
        description: { Action: 'PUT', Value: description }
    };

    const params = {
        TableName: process.env.BOARDS_TABLE_NAME,
        Key: { id },
        AttributeUpdates: skipNullAttributes(attributes),
        ReturnValues: 'ALL_NEW'
    }

    let updatedBoard

    try {
        const result = await dynamodb.update(params).promise()
        updatedBoard = result.Attributes
    } catch (error) {
        console.error(error)
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedBoard)
    }
}

export const handler = commonMiddleware(updateBoard)