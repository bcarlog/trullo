import axios from 'axios'

export const getUsers = ({username, boardId}) => {
    return new Promise((resolve, reject) => {
        axios.get(`user?username=${username}&boardId=${boardId}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}