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