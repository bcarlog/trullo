import commonMiddleware from '../../lib/commonMiddleware'
import fetch from 'node-fetch';

async function getImages(event, context) {
    const { q } = event.queryStringParameters
    const API_KEY = process.env.PIXABAY_API_KEY
    const MIN_WIDTH = 400
    const MAX_WIDTH = 2400
    const PER_PAGE = 12

    const res = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${q}&min_width=${MIN_WIDTH}&max_width=${MAX_WIDTH}&per_page=${PER_PAGE}`)
    const data = await res.json()

    return {
        statusCode: 200,
        body: JSON.stringify(data.hits)
    }
}

export const handler = commonMiddleware(getImages)