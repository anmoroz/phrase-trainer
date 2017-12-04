'use strict'

var sql = require('sql');

module.exports= class CategoryService {

    constructor() {
        this.table = sql.define({
            name: 'category',
            columns: ['id', 'name'],
        })
    }

    getAll(connection) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
            .toQuery('mysql')
        ;

        return new Promise((resolve, reject) => {
            connection.query(q.text, q.values, (err, res) => {
                if (err) return reject(err)

                return resolve(res)
            })
        })
    }
}