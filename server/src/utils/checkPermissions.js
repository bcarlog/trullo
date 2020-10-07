import * as BoardServices from '../components/board/BoardServices'
import * as UserServices from '../components/user/UserServices'

export const checkUserInBoard = async({boardId, email}) => {
    const board = await BoardServices.getBoardById(boardId)
    const user = await UserServices.getUserByEmail(email)

    if(board.owner !== email && !board.team.includes(user.id)){
        throw new createError.Unauthorized("You can't add cards to this board")
    }
}