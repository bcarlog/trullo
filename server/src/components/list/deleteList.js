import commonMiddleware from '../../lib/commonMiddleware'

import * as ListServices from './ListServices'
import createError from 'http-errors'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function deleteList(event, context) {
    const { id } = event.pathParameters
    const { email } = event.requestContext.authorizer

    const list = await ListServices.getListById(id)
    if(!list){
        throw new createError.NotFound()
    }
    
    await checkUserInBoard({boardId: list.boardId, email})

    await ListServices.deleteListOrder({listId: id, boardId: list.boardId, order: list.order})

    return {
        statusCode: 200
    }
}

export const handler = commonMiddleware(deleteList)