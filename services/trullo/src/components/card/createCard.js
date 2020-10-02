import { v4 as uuid } from 'uuid'
import commonMiddleware from '../../lib/commonMiddleware'

import * as CardServices from './CardServices'

import { checkUserInBoard } from '../../utils/checkPermissions'

async function createCard(event, context) {
    const { 
            title, 
            description = null, 
            listId, 
            boardId, 
            coverSmall = null, 
            coverMedium = null, 
            labels = [] 
    } = event.body

    const { email } = event.requestContext.authorizer

    await checkUserInBoard({boardId, email})

    const oldCards = await CardServices.getCards(listId)

    const now = new Date()

    const card = {
        id: uuid(),
        owner: email,
        title,
        description,
        coverSmall,
        coverMedium,
        labels,
        order: oldCards.length + 1,
        listId,
        boardId,
        status: 'ACTIVE',
        createAt: now.toISOString(),
    }
   
    await CardServices.createCard(card)

    return {
        statusCode: 201,
        body: JSON.stringify( card ),
    };
}

export const handler = commonMiddleware(createCard)


