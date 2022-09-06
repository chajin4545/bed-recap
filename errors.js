module.exports.TABLE_ALREADY_EXISTS_ERROR = class TABLE_ALREADY_EXISTS_ERROR extends Error {
    constructor(tableName) {
        super(`Table ${tableName} already exists!`);
    }
};

module.exports.EMPTY_RESULT_ERROR = class EMPTY_RESULT_ERROR extends Error {};
