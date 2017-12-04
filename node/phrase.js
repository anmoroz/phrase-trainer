'use strict'

const crud = {
    getRandom: (connection, parameters) => new Promise((resolve, reject) => {
        var where = (parameters.category && parseInt(parameters.category) > 0)
            ? 'where category_id = '+parseInt(parameters.category) : ''

        connection.query('SELECT rus, eng FROM phrases ' + where + ' ORDER BY RAND() LIMIT 1', function (error, results, fields) {
            if (error) throw error;

            return resolve({
                id: results[0].id,
                rus: results[0].rus,
                eng: results[0].eng,
                category: ''
            });
        });
    }),
};

function serv () {
    return crud;
}


module.exports = serv