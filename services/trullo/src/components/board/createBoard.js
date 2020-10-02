import { v4 as uuid } from 'uuid'
import commonMiddleware from '../../lib/commonMiddleware'
import validator from '@middy/validator'

import createBoardsSchema from './schema/createBoardSchema'

import * as BoardServices from './BoardServices'

async function createBoard(event, context) {
    const { title, cover, visibility } = event.body
    const { email } = event.requestContext.authorizer

    const now = new Date()

    const board = {
        id: uuid(),
        owner: email,
        title,
        cover,
        description: null,
        team: [],
        visibility,
        status: 'ACTIVE',
        createAt: now.toISOString(),
    }
   
    await BoardServices.createBoard(board)

    return {
        statusCode: 201,
        body: JSON.stringify( board ),
    };
}

export const handler = commonMiddleware(createBoard)
    .use(validator({ inputSchema: createBoardsSchema, useDefaults: true }))


