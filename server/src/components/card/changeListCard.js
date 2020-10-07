import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

import * as CardServices from './CardServices'

async function changeListCard(event, context) {
    const { id } = event.pathParameters
    const { listId, order } = event.body
    const { email } = event.requestContext.authorizer

    const card = await CardServices.getCardById(id)

    if(!card){
        throw new createError.BadRequest('Card doesn\' exists')
    }

    if (!listId && !order) {
        throw new createError.Forbidden('Needs a listId and order')
    }

    const updatedCard = await CardServices.updateListCard(id, {listId, order})

    return {
        statusCode: 200,
        body: JSON.stringify(updatedCard)
    }
}

export const handler = commonMiddleware(changeListCard)