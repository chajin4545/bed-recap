const { query } = require('../database');
const {
    DUPLICATE_ENTRY_ERROR,
    EMPTY_RESULT_ERROR,
    MYSQL_ERROR_CODE,
    TABLE_ALREADY_EXISTS_ERROR,
} = require('../errors');

module.exports.initTable = function initTable() {
    const sql = `CREATE TABLE modules_tab (
        id INT auto_increment primary key,
        code VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        credit DECIMAL(2,1) NOT NULL
    )`;
    return query(sql).catch(function (error) {
        if (error.errno === MYSQL_ERROR_CODE.TABLE_ALREADY_EXISTS) {
            throw new TABLE_ALREADY_EXISTS_ERROR(`modules_tab`);
        }
        throw error;
    });
};

module.exports.create = function create(code, name, credit) {
    const sql = `INSERT INTO modules_tab (code, name, credit) VALUES (?, ?, ?)`;
    return query(sql, [code, name, credit]).catch(function (error) {
        if (error.errno === MYSQL_ERROR_CODE.DUPLICATE_ENTRY) {
            throw new DUPLICATE_ENTRY_ERROR(`Module ${code} already exists`);
        }
        throw error;
    });
};

module.exports.retrieveByCode = function retrieveByCode(code) {
    const sql = `SELECT * FROM modules_tab WHERE code = ?`;
    return query(sql, [code]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    });
};
module.exports.bulkRetrieveByCode = function bulkRetrieveByCode(code) {
    const sql = `SELECT * FROM modules_tab WHERE (code) VALUES ?`;
    return query(sql, [code]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module not found!`);
        }
        return rows[0];
    });
};

module.exports.bulkRetrieveByName = function bulkRetrieveByName(name) {
    const sql = `SELECT * FROM modules_tab WHERE (name) VALUES ?`;
    return query(sql, [name]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module not found!`);
        }
        return rows[0];
    });
};

module.exports.bulkRetrieveByCodeName = function bulkRetrieveByCodeName(codeName) {
    const sql = `SELECT * FROM modules_tab WHERE (code , name) VALUES ?`;
    return query(sql, [codeName]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module not found!`);
        }
        return rows[0];
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
    // TODO implement delete by code
    const sql = `DELETE FROM modules_tab WHERE code = ?`
    return query(sql, [code]).then(function (result) {
        const rows = result[0];
        let affectedRows = rows.affectedRows;
        console.log(rows);
        if (affectedRows === 0) {
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    // TODO implement update by code
    const sql  = `UPDATE modules_tab SET credit = ? WHERE code = ?`
    return query(sql, [credit,code]).then(function(result){
        const rows = result[0];
        console.log(rows);
        if (rows.affectedRows === 0) {
            console.log(result)
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    })
};

module.exports.retrieveAll = function retrieveAll() {
    // TODO implement retrieve all
    const sql = `SELECT code,name,credit FROM modules_tab`
    return query(sql).then(function(result){
        const rows = result;
        if (rows.length === 0) {
            console.log(result)
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    })
};

module.exports.retrieveBulk = function retrieveBulk(codes) {
    const sql = 'SELECT * FROM modules_tab WHERE code IN (?)';
    return query(sql, [codes]).then(function (response) {
        const rows = response[0];
        const result = {};
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const code = row.code;
            result[code] = row;
        }
        return result;
    });
};

module.exports.createBulk = function createBulk(newModules) {
    // TODO implement bulk create
    const sql = `INSERT INTO modules_tab (code,name,credit) VALUES ?`
    return query(sql, [newModules]).catch(function (error) {
        console.log(error)
        if (error.errno === MYSQL_ERROR_CODE.DUPLICATE_ENTRY) {
            throw new DUPLICATE_ENTRY_ERROR(`Module already exists`);
        }
        throw error;
    });
};

module.exports.deleteBulk = function deleteBulk(modulesArr) {
    // TODO implement bulk delete
    const sql = `DELETE FROM modules_tab WHERE code IN (?)`
    return query(sql, [modulesArr]).then(function (result) {
        const rows = result[0];
        let affectedRows = rows.affectedRows;
        if (affectedRows === 0) {
            throw new EMPTY_RESULT_ERROR(`Modules not found!`);
        }
        console.log(rows[0])
        return rows[0];
    });
};

