import commonMiddleware from '../../lib/commonMiddleware'

import * as CardServices from './CardServices'
import createError from 'http-errors'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function deleteCard(event, context) {
    const { id } = event.pathParameters
    const { email } = event.requestContext.authorizer

    const card = await CardServices.getCardById(id)
    if(!card){
        throw new createError.NotFound()
    }
    
    await checkUserInBoard({boardId: card.boardId, email})

    await CardServices.deleteCardOrder({cardId: id, listId: card.listId, order: card.order})

    return {
        statusCode: 200
    }
}

export const handler = commonMiddleware(deleteCard)