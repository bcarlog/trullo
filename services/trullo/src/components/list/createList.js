import { v4 as uuid } from 'uuid'

import * as ListServices from './ListServices'
import commonMiddleware from '../../lib/commonMiddleware'
import { checkUserInBoard } from '../../utils/checkPermissions'

async function createList(event, context) {
    const { title, boardId } = event.body
    const { email } = event.requestContext.authorizer

    await checkUserInBoard({boardId, email})

    const now = new Date()

    const list = {
        id: uuid(),
        title,
        boardId,
        owner: email,
        status: 'ACTIVE',
        createAt: now.toISOString(),
    }
   
    await ListServices.createList(list)

    return {
        statusCode: 201,
        body: JSON.stringify( list ),
    };
}

export const handler = commonMiddleware(createList)


