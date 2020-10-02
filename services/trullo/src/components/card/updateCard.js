import commonMiddleware from '../../lib/commonMiddleware'

import * as CardServices from './CardServices'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function updateCard(event, context) {
    const { id } = event.pathParameters
    const { title, coverSmall, coverMedium, description, labels } = event.body
    const { email } = event.requestContext.authorizer

    const card = await CardServices.getCardById(id)
    
    await checkUserInBoard({boardId: card.boardId, email})

    const updatedCard = await CardServices.updateCardData({
        cardId: id,
        title,
        description,
        coverSmall,
        coverMedium,
        labels
    })

    return {
        statusCode: 200,
        body: JSON.stringify({})
    }
}

export const handler = commonMiddleware(updateCard)