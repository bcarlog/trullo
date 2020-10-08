import AWS from 'aws-sdk'
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient()

import { orderLists, orderListsWithListEliminated } from './utils/lists'

export const createList = async (list) => {

    const oldLists = await getLists(list.boardId)
    const newList = {
        ...list,
        order: oldLists.length + 1
    }

    try {
        return await dynamodb.put({
            TableName: process.env.LISTS_TABLE_NAME,
            Item: newList,
        }).promise()
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getLists = async (boardId) => {
    try {
        const params = {
            TableName: process.env.LISTS_TABLE_NAME,
            IndexName: 'boardIdIndex',
            KeyConditionExpression: "boardId = :boardId",
            ExpressionAttributeValues: {
                ":boardId": boardId
            }
        };
        const result = await dynamodb.query(params).promise()
        return result.Items.filter(list => list.status !== 'INACTIVE')
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getListById = async (id) => {
    try {
        const result = await dynamodb.get({
            TableName: process.env.LISTS_TABLE_NAME,
            Key: { id }
        }).promise()
        return result.Item
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

const updateListOrder = async ({ listId, order }) => {
    const params = {
        TableName: process.env.LISTS_TABLE_NAME,
        Key: { id: listId },
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

export const updateListsOrder = async (listId, boardId, order) => {
    const lists = await getLists(boardId)
    const orderedLists = orderLists({ lists, listId, order})
    const orderedListsPromises = orderedLists.map(list => updateListOrder({ listId: list.id, order: list.order }))
    await Promise.all(orderedListsPromises)
}

export const updateList = async ({listId, title}) => {
    const params = {
        TableName: process.env.LISTS_TABLE_NAME,
        Key: { id: listId },
        UpdateExpression: 'set title = :title',
        ExpressionAttributeValues: {
            ':title': title,
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

export const deleteList = async ({listId}) => {
    const params = {
        TableName: process.env.LISTS_TABLE_NAME,
        Key: { id: listId },
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

export const deleteListOrder = async ({listId, boardId, order}) => {
    await deleteList({listId})
    const lists = await getLists(boardId)
    const orderedLists = orderListsWithListEliminated({ lists, order})
    const orderedListsPromises = orderedLists.map(list => updateListOrder({ listId: list.id, order: list.order }))
    await Promise.all(orderedListsPromises)
}