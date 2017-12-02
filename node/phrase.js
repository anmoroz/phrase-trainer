const mysql = require('mysql');

var connection;

var getDbConnection = function() {
    if(!connection){
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'phrase-trainer'
        })
        connection.connect();
    }

    return connection;
};


const crud = {
    getRandom: () => new Promise((resolve, reject) => {

        var connection = getDbConnection();

        connection.query('SELECT rus, eng FROM phrases ORDER BY RAND() LIMIT 1', function (error, results, fields) {
            if (error) throw error;

            return resolve({
                rus: results[0].rus,
                eng: results[0].eng,
                category: ''
            });
        });
    }),
};

function serv () {

    return crud;
    /*return {
        phrase: {
            rus: 'Привет мир!',
            eng: 'Hello world!',
            category: 'Have you V3\\ed ?'
        }
    }*/
}


module.exports = serv