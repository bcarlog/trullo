const _ = require('lodash');

const skipNullAttributes = (attributes) => {
    return _.omitBy(attributes, (attr) => {
        return _.isNil(attr.Value);
    });
}

export default skipNullAttributes