const schema = {
    properties: {
        body: {
            type: 'object',
            properties: {
                visibility: {
                    type: 'string',
                    enum: ['PRIVATE', 'PUBLIC'],
                    default: 'PRIVATE'
                }
            }
        }
    },
    type: 'object',
}

export default schema