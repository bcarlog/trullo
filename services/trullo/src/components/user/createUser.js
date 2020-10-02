import createHttpError from 'http-errors'
import { v4 as uuid } from 'uuid'
import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

import * as UserServices from './UserServices'

async function createUser(event, context) {
    const { username, email, phoneNumber, photo } = event.body

    const alreadyRegister = await UserServices.getUserByEmail(email)
    if(alreadyRegister){
        throw new createError.BadRequest("Email already register")
    }

    const now = new Date()

    const user = {
        id: uuid(),
        username,
        email,
        phoneNumber,
        photo,
        status: 'ACTIVE',
        createAt: now.toISOString(),
    }
   
    await UserServices.createUser(user)

    return {
        statusCode: 201,
        body: JSON.stringify( user ),
    };
}

export const handler = commonMiddleware(createUser)