import commonMiddleware from '../../lib/commonMiddleware'

import * as BoardServices from './BoardServices'
import * as UserServices from '../user/UserServices'
import getTeamFull from './utils/getTeamFull'
import { getUserFull } from './utils/getUserFull'

async function getBoards(event, context) {
    const { email } = event.requestContext.authorizer

    const user = await UserServices.getUserByEmail(email)
    
    let boards = await BoardServices.getPublicBoards({exceptEmail: email, exceptId: user.id}) //Email for filter

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

export const handler = commonMiddleware(getBoards)