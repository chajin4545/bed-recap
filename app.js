const express = require('express');
const { EMPTY_RESULT_ERROR, DUPLICATE_ENTRY_ERROR, TABLE_ALREADY_EXISTS_ERROR } = require('./errors');

const modulesModel = require('./models/modules');

const app = express();
app.use(express.json()); // to process JSON in request body

app.use(express.static('public'));

app.post('/modules/table', function (req, res, next) {
    return modulesModel
        .initTable()
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof TABLE_ALREADY_EXISTS_ERROR) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.post('/modules', function (req, res, next) {
    const code = req.body.code;
    const name = req.body.name;
    const credit = req.body.credit;

    return modulesModel
        .create(code, name, credit)
        .then(function () {
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof DUPLICATE_ENTRY_ERROR) {
                return res.status(400).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

// Question: This needs to be before GET /modules/:code, why?
app.get('/modules/bulk', function (req, res, next) {
    const codesCsv = req.query.codes; // query parameters are strings
    const codes = codesCsv.split(',');
    return modulesModel
        .retrieveBulk(codes)
        .then(function (result) {
            return res.json(result);
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).json({ error: 'Unknown Error!' });
        });
});

app.get('/modules/:code', function (req, res, next) {
    const code = req.params.code;
    console.error(`---------------${code}----------------`)
    return modulesModel
        .retrieveByCode(code)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.get('/bulkModules/code/:codes', function (req, res, next) {
    const code = req.params.codes.split(",");
    console.error(`---------------${code}----------------`)
    return modulesModel
        .bulkRetrieveByCode(code)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});
app.get('/bulkModules/name/:names', function (req, res, next) {
    const name = req.params.names.split(",");
    return modulesModel
        .bulkRetrieveByName(name)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});
app.get('/bulkModules/codeNames/:codeNames', function (req, res, next) {
    const codeNames = req.params.codeNames.split("/");
    return modulesModel
        .bulkRetrieveByCodeName(codeNames)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.delete('/modules/bulk', function (req, res, next) {
    // TODO: Implement bulk delete modules
    let modulesArr = req.body.modulesArr;
    return modulesModel
    .deleteBulk(modulesArr)
    .then(function(modules){
        return res.status(200).json({modules : modules})
    })
    .catch(function(error){
        if (error instanceof EMPTY_RESULT_ERROR) {
            return res.status(404).json({ error: error.message });
        } else return res.status(500).json({ error: 'Unknown Error' });
    })
});

app.delete('/modules/:code', function (req, res, next) {
    // TODO: Implement Delete module by Code
    const code = req.params.code;
    console.error(`---------------${code}----------------`)
    return modulesModel
        .deleteByCode(code)
        .then(function (module) {
            return res.json({ module: module });
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.put('/modules/:code', function (req, res, next) {
    // TODO: Implement Update module by Code
    //      You can decide where you want to put the Credit in the Request
    const code = req.body.code;
    const credit = req.body.credit;
    return modulesModel
        .updateByCode(code,credit)
        .then(function(module){
            return res.json({module: module})
        })
        .catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });

});

app.get('/modules', function (req, res, next) {
    // TODO: Implement Get all modules
    return modulesModel
        .retrieveAll()
        .then(function(result){
            return res.json({result:result})
        }).catch(function (error) {
            console.error(error);
            if (error instanceof EMPTY_RESULT_ERROR) {
                return res.status(404).json({ error: error.message });
            } else return res.status(500).json({ error: 'Unknown Error' });
        });
});

app.post('/modules/bulk', function (req, res, next) {
    // TODO: Implement bulk insert modules
    let bulkdata = req.body.bulkData;
    return modulesModel
        .createBulk(bulkdata)
        .then(function(){
            return res.sendStatus(201);
        })
        .catch(function(error){
            if(error instanceof DUPLICATE_ENTRY_ERROR){
                return res.status(404).json({error: error.message})
            }
            else return res.status(500).json({error : 'Unknown Error'})
        })
});

module.exports = app;
