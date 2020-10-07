import commonMiddleware from '../../lib/commonMiddleware'

import * as UserServices from './UserServices'
import * as BoardServices from '../board/BoardServices'

async function getUsers(event, context) {
    const { username, boardId } = event.queryStringParameters

    let users = await UserServices.getUsers()
    if(boardId){
        const board = await BoardServices.getBoardById(boardId)
        users = users.filter(user => user.email !== board.owner)
        users = users.filter(user => !board.team.includes(user.id))
    }
    if(username) {
        users = users.filter(user => user.username.toUpperCase().indexOf(username.toUpperCase()) !== -1)
    }else {
        users = users.slice(0,30)
    }

    users = users.map(user => ({
        photo: user.photo,
        username: user.username,
        id: user.id
    }))

    return {
        statusCode: 200,
        body: JSON.stringify(users)
    }
}

export const handler = commonMiddleware(getUsers)