import axios from 'axios'

export const getPublicBoards = (isAuthenticated) => {
    let url = 'public-boards-no-auth'
    if (isAuthenticated) {
        url = 'public-boards'
    }
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const getOwnBoards = () => {
    return new Promise((resolve, reject) => {
        axios.get('own-boards')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const getBoardById = (id, isAuthenticated) => {
    let url = `board/${id}/no-auth`
    if (isAuthenticated) {
        url = `board/${id}`
    }
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const createBoard = (board) => {
    return new Promise((resolve, reject) => {
        axios.post('board', board)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

export const updateBoard = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.patch(`board/${id}`, data)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}