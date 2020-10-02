import axios from 'axios'

export const createCard = (card) => {
    return new Promise((resolve, reject) => {
        axios.post('card', card)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const updateCardList = ({cardId, listId, order}) => {
    return new Promise((resolve, reject) => {
        axios.patch(`card/${cardId}/list`, {listId, order})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const updateCard = ({cardId, title="", description="", coverSmall=null, coverMedium=null, labels=[]}) => {
    return new Promise((resolve, reject) => {
        axios.patch(`card/${cardId}`, {title, description, coverSmall, coverMedium, labels})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}