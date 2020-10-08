import axios from 'axios'

export const createList = (list) => {
    return new Promise((resolve, reject) => {
        axios.post('list', list)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const updateListOrder = ({ listId, order }) => {
    return new Promise((resolve, reject) => {
        axios.patch(`list/${listId}/order`, { order })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const changeListTitle = ({ listId, title }) => {
    return new Promise((resolve, reject) => {
        axios.patch(`list/${listId}`, { title })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const removeList = ({ listId }) => {
    return new Promise((resolve, reject) => {
        axios.delete(`list/${listId}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}