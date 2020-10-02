import AWS from 'aws-sdk'
import skipNullAttributes from '../../utils/skipNullAttributes'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export const createBoard = async(board) => {
    try{
        return await dynamodb.put({
            TableName: process.env.BOARDS_TABLE_NAME,
            Item: board,
        }).promise()
    }catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getBoardById = async(id) => {
    let board

    try{
        const result = await dynamodb.get({
            TableName: process.env.BOARDS_TABLE_NAME,
            Key: { id }
        }).promise()

        board = result.Item
    }catch(error){
        console.error(error)
        throw new createError.InternalServerError(error)
    }

    if(!board){
        throw new createError.NotFound(`Board with ID "${id} not found!`)
    }

    return board
}

export const getPublicBoards = async({except=null}) =>{ //Email a no considerar
    try {
        const params = {
            TableName: process.env.BOARDS_TABLE_NAME,
            IndexName: 'visibilityIndex',
            KeyConditionExpression: 'visibility = :visibility',
            ExpressionAttributeValues: {
                ':visibility': 'PUBLIC',
            }
        }
        const result = await dynamodb.query(params).promise()
        return result.Items.filter(item => item.status === 'ACTIVE' && item.owner !== except)
    } catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const getOwnBoards = async({email, userId}) =>{
    try {
        let result = await dynamodb.scan({
            TableName: process.env.BOARDS_TABLE_NAME
        }).promise()
        result = result.Items.filter(item => item.status === 'ACTIVE')
        result = result.filter(item => item.owner === email || item.team.includes(userId) )
        return result
    } catch(error){
        console.log(error)
        throw new createError.InternalServerError(error)
    }
}

export const updateBoard = async(id, attributes) => {
    const params = {
        TableName: process.env.BOARDS_TABLE_NAME,
        Key: { id },
        AttributeUpdates: skipNullAttributes(attributes),
        ReturnValues: 'ALL_NEW'
    }

    try {
        const result = await dynamodb.update(params).promise()
        return result.Attributes
    } catch (error) {
        console.error(error)
        throw new createError.InternalServerError(error)
    }
}