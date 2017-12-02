'use strict'

const crud = {
    getAll: (connection) => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM category', function (error, results, fields) {
            if (error) throw error;

            return resolve(results);
        });
    }),
};

function serv () {
    return crud;
}


module.exports = serv