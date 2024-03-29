import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

import * as BoardServices from './BoardServices'
import * as UserServices from '../user/UserServices'
import { toBoardRes } from './utils/boardRes'

async function updateBoard(event, context) {
    const { id } = event.pathParameters
    const { title, description, visibility, team } = event.body
    const { email } = event.requestContext.authorizer

    const user = await UserServices.getUserByEmail(email)

    const board = await BoardServices.getBoardById(id)

    if(board.owner !== email){
        throw new createError.Unauthorized(`You cann't update this board`)
    }

    if(board.status !== 'ACTIVE'){
        throw new createError.BadRequest(`You cann't update on boards inactives`)
    }

    if (!title && !description && !visibility && !team) {
        throw new createError.Forbidden('Needs a title or description or visibility or team')
    }

    const amIEdit = board.owner === email || board.team.includes(user.id)
    const amIOwner = board.owner === email

    // ESTO SE PUEDE MEJORAR
    var attributes = {
        title: { Action: 'PUT', Value: title },
        description: { Action: 'PUT', Value: description },
        visibility: { Action: 'PUT', Value: visibility },
        team: { Action: 'PUT', Value: team },
    };

    const updatedBoard = await BoardServices.updateBoard(id, attributes)
    const boardRes = await toBoardRes(updatedBoard)
    boardRes.amIOwner = amIOwner
    boardRes.amIEdit = amIEdit

    return {
        statusCode: 200,
        body: JSON.stringify(boardRes)
    }
}

export const handler = commonMiddleware(updateBoard)