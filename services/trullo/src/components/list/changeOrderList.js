import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

import * as ListServices from './ListServices'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function changeOrderList(event, context) {
    const { id } = event.pathParameters
    const { order } = event.body
    const { email } = event.requestContext.authorizer

    const list = await ListServices.getListById(id)

    if(!list){
        throw new createError.BadRequest('List doesn\' exists')
    }

    await checkUserInBoard({boardId:list.boardId, email})

    await ListServices.updateListsOrder(id, list.boardId, order)

    return {
        statusCode: 200,
        //body: JSON.stringify(updatedLists)
    }
}

export const handler = commonMiddleware(changeOrderList)