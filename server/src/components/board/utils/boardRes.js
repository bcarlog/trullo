import * as ListServices from '../../list/ListServices'
import * as CardServices from '../../card/CardServices'
import getTeamFull from './getTeamFull'
import { getUserFull } from './getUserFull'

export const toBoardRes = async (board) => {
    const lists = await ListServices.getLists(board.id)
    let listsWithCards = lists.map(async (list) => {
        delete list.owner
        let cards = await CardServices.getCards(list.id)
        cards = cards.map(card => ({...card, owner:null}))
        return {
            ...list,
            cards
        }
    })
    listsWithCards = await Promise.all(listsWithCards)

    board.lists = listsWithCards
    board.teamFull = await getTeamFull(board.team)
    board.ownerFull = await getUserFull({ email: board.owner })

    delete board.owner

    return board
}