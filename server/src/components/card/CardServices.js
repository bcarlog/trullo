import AWS from 'aws-sdk'
import createError from 'http-errors'

import { orderList, orderListWithNewCard, orderCardsWithCardEliminated } from './utils/lists'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export const createCard = async (card) => {
    try {
        return await dynamodb.put({
            TableName: process.env.CARDS_TABLE_NAME,
            Item: card,
        }).promise()
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getCards = async (listId) => {
    try {
        const params = {
            TableName: process.env.CARDS_TABLE_NAME,
            IndexName: 'listIdIndex',
            KeyConditionExpression: "listId = :listId",
            ExpressionAttributeValues: {
                ":listId": listId
            }
        };
        const result = await dynamodb.query(params).promise()
        return result.Items.filter(card => card.status !== 'INACTIVE')
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getCardById = async (id) => {
    try {
        const result = await dynamodb.get({
            TableName: process.env.CARDS_TABLE_NAME,
            Key: { id }
        }).promise()
        return result.Item
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

const updateCardOrder = async ({ cardId, order }) => {
    const params = {
        TableName: process.env.CARDS_TABLE_NAME,
        Key: { id: cardId },
        UpdateExpression: 'set #order = :order',
        ExpressionAttributeValues: {
            ':order': order
        },
        ExpressionAttributeNames: {
            '#order': 'order',
        },
        ReturnValues: 'ALL_NEW' // In this case return a object {}
    }
    try {
        const result = await dynamodb.update(params).promise()
        return result.Attributes
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const updateCardData = async ({ cardId, title, coverSmall, coverMedium, description, labels }) => {
    const params = {
        TableName: process.env.CARDS_TABLE_NAME,
        Key: { id: cardId },
        UpdateExpression: 'set title = :title, coverSmall = :coverSmall, coverMedium = :coverMedium, description = :description, labels = :labels',
        ExpressionAttributeValues: {
            ':title': title,
            ':coverSmall': coverSmall,
            ':coverMedium': coverMedium,
            ':coverMedium': coverMedium,
            ':description': description,
            ':labels': labels,
        },
        ReturnValues: 'ALL_NEW' // In this case return a object {}
    }
    try {
        const result = await dynamodb.update(params).promise()
        return result.Attributes
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

const updateCardList = async ({ cardId, listId }) => {
    const params = {
        TableName: process.env.CARDS_TABLE_NAME,
        Key: { id: cardId },
        UpdateExpression: 'set listId = :listId',
        ExpressionAttributeValues: {
            ':listId': listId,
        },
        ReturnValues: 'ALL_NEW' // In this case return a object {}
    }
    try {
        const result = await dynamodb.update(params).promise()
        return result.Attributes
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const updateListCard = async (id, { listId, order }) => {
    const card = await getCardById(id)

    if (card.listId === listId) { // Change of order in same list
        const cardsList = await getCards(listId)
        const orderedList = orderList({ list: cardsList, id, order })
        const orderedListPromises = orderedList.map(card => updateCardOrder({ cardId: card.id, order: card.order }))
        await Promise.all(orderedListPromises)

    } else { // Change of list and order
        const oldListId = card.listId
        const oldOrder = card.order

        await updateCardList({ cardId: card.id, listId })
        const cardsList = await getCards(listId)
        const orderedList = orderListWithNewCard({ list: cardsList, id, order })
        const orderedListPromises = orderedList.map(card => updateCardOrder({ cardId: card.id, order: card.order }))
        await Promise.all(orderedListPromises)

        // Order Old List
        const oldList = await getCards(oldListId)
        const oldListOrdered = oldList.map(card => card.order >= oldOrder ? { ...card, order: card.order - 1 } : card)
        const oldListOrderedPromises = oldListOrdered.map(card => updateCardOrder({ cardId: card.id, order: card.order }))
        await Promise.all(oldListOrderedPromises)
    }

}

export const deleteCard = async ({ cardId }) => {
    const params = {
        TableName: process.env.CARDS_TABLE_NAME,
        Key: { id: cardId },
        UpdateExpression: 'set #status = :status',
        ExpressionAttributeValues: {
            ':status': 'INACTIVE',
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        },
        ReturnValues: 'ALL_NEW' // In this case return a object {}
    }
    try {
        const result = await dynamodb.update(params).promise()
        return result.Attributes
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const deleteCardOrder = async ({ cardId, listId, order }) => {
    await deleteCard({ cardId })
    const cards = await getCards(listId)
    const orderedCards = orderCardsWithCardEliminated({ cards, order })
    const orderedListsPromises = orderedCards.map(card => updateCardOrder({ cardId: card.id, order: card.order }))
    await Promise.all(orderedListsPromises)
}