import commonMiddleware from '../../lib/commonMiddleware'

import * as ListServices from './ListServices'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function updateList(event, context) {
    const { id } = event.pathParameters
    const { title } = event.body
    const { email } = event.requestContext.authorizer

    const list = await ListServices.getListById(id)
    
    await checkUserInBoard({boardId: list.boardId, email})

    const updatedList = await ListServices.updateList({listId: id, title})

    return {
        statusCode: 200
    }
}

export const handler = commonMiddleware(updateList)