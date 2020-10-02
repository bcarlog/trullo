import axios from 'axios'

export const getImages = ({ query }) => {
    return new Promise((resolve, reject) => {
        axios.get(`image?q=${query}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}