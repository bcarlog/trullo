import commonMiddleware from '../../lib/commonMiddleware'

import * as BoardServices from './BoardServices'
import { toBoardRes } from './utils/boardRes'

async function getBoard(event, context) {
    const { id } = event.pathParameters
    const { email } = event.requestContext.authorizer

    const board = await BoardServices.getBoardById(id)

    const amIOwner = board.owner === email
    const boardRes = await toBoardRes(board)
    boardRes.amIOwner = amIOwner

    return {
        statusCode: 200,
        body: JSON.stringify(boardRes)
    }
}

export const handler = commonMiddleware(getBoard)