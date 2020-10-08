import commonMiddleware from '../../lib/commonMiddleware'

import * as BoardServices from './BoardServices'
import getTeamFull from './utils/getTeamFull'
import { getUserFull } from './utils/getUserFull'

async function getPublicBoardsNoAuth(event, context) {
    
    let boards = await BoardServices.getPublicBoards({}) //Email for filter

    boards = await Promise.all(boards.map(async(board) => ({
        ...board,
        teamFull: await getTeamFull(board.team),
        ownerFull: await getUserFull({ email: board.owner }),
        owner: null
    })))

    return {
        statusCode: 200,
        body: JSON.stringify(boards)
    }
}

export const handler = commonMiddleware(getPublicBoardsNoAuth)