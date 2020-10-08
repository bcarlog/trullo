import commonMiddleware from '../../lib/commonMiddleware'

import * as BoardServices from './BoardServices'
import { toBoardRes } from './utils/boardRes'

async function getBoardNoAuth(event, context) {
    const { id } = event.pathParameters

    const board = await BoardServices.getBoardById(id)

    if(board.visibility !== 'PUBLIC'){
        return {
            statusCode: 403,
        }
    }

    const boardRes = await toBoardRes(board)
    boardRes.amIOwner = false
    boardRes.amIEdit = false

    return {
        statusCode: 200,
        body: JSON.stringify(boardRes)
    }
}

export const handler = commonMiddleware(getBoardNoAuth)