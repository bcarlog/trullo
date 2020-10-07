import commonMiddleware from '../../lib/commonMiddleware'

import * as BoardServices from './BoardServices'
import * as UserServices from '../user/UserServices'
import { toBoardRes } from './utils/boardRes'

async function getBoard(event, context) {
    const { id } = event.pathParameters
    const { email } = event.requestContext.authorizer

    const user = await UserServices.getUserByEmail(email)

    const board = await BoardServices.getBoardById(id)

    const amIEdit = board.owner === email || board.team.includes(user.id)

    const amIOwner = board.owner === email
    const boardRes = await toBoardRes(board)
    boardRes.amIOwner = amIOwner
    boardRes.amIEdit = amIEdit

    return {
        statusCode: 200,
        body: JSON.stringify(boardRes)
    }
}

export const handler = commonMiddleware(getBoard)