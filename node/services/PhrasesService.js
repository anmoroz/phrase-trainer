'use strict'

var sql = require('sql');

module.exports= class PhrasesService {

    constructor() {
        this.table= sql.define({
            name: 'phrases',
            columns: ['id', 'rus', 'eng', 'category_id'],
        })
    }

    async queryRandom(connection, queryParams) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
        ;

        if (queryParams.category && parseInt(queryParams.category) > 0) {
            q = q.where(
                this.table.category_id.equals(parseInt(queryParams.category))
            )
        }
        q = q.order('RAND()')
            .limit(1)
            .toQuery('mysql')
        ;

        return this.queryHelper(connection, q)
    }

    async queryNext(connection, queryParams) {

        let q = this.getQueryForNext(queryParams).toQuery('mysql')

        try {
            let res = await this.queryHelper(connection, q)

            if (res === undefined) {
                queryParams.lastId = 0

                q = this.getQueryForNext(queryParams)

                q = q.toQuery('mysql')

                console.log('Second ' + q.text);

                res= await this.queryHelper(connection, q)
            }

            // First or second result
            return res
        } catch (err) {
            console.log(err);
        }
    }

    queryHelper(connection, q) {
        return new Promise((resolve, reject) => {
            connection.query(q.text, q.values, (err, res) => {
                if (err) return reject(err)

                return resolve(res[0])
            })
        })
    }

    getQueryForNext(queryParams) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
        ;

        if (queryParams.category && parseInt(queryParams.category) > 0) {
            q = q.where(
                this.table.category_id.equals(parseInt(queryParams.category))
            )
        }

        if (parseInt(queryParams.lastId) > 0) {
            q = q.where(
                this.table.id.gt(parseInt(queryParams.lastId))
            )
        }

        return q.order('id').limit(1)
    }
}