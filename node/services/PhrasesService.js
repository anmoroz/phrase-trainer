'use strict'

var sql = require('sql');

var PER_PAGE   = 10;

module.exports= class PhrasesService {

    constructor() {
        this.table= sql.define({
            name: 'phrases',
            columns: ['id', 'rus', 'eng', 'category_id'],
        })
    }

    async all(connection, queryParams) {
        try {
            let totalCount = await this.getTotalCount(connection, queryParams)
            return await this.queryList(connection, queryParams, totalCount)
        } catch (err) {
            console.log(err);
        }
    }

    async queryRandom(connection, queryParams) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
        ;

        q = this.setCategoryCondition(queryParams.category, q)
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

                //console.log('Second ' + q.text);

                res = await this.queryHelper(connection, q)
            }

            // First or second result
            return res
        } catch (err) {
            console.log(err);
        }
    }

    queryList(connection, queryParams, totalCount) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
        ;

        q = this.setCategoryCondition(queryParams.category, q)
        q = q.limit(queryParams.limit | 10)
            .offset(queryParams.offset | 0)
        ;

        q = q.toQuery('mysql')

        return new Promise((resolve, reject) => {
            connection.query(q.text, q.values, (err, res) => {
                if (err) return reject(err)

                var data = {
                    items: res,
                    meta: {
                        limit: queryParams.limit | PER_PAGE,
                        offset: queryParams.offset | 0,
                        total_count: totalCount
                    }
                }

                return resolve(data)
            })
        })
    }

    queryHelper(connection, q) {
        return new Promise((resolve, reject) => {
            connection.query(q.text, q.values, (err, res) => {
                if (err) return reject(err)

                return resolve(res[0])
            })
        })
    }

    setCategoryCondition(category, q) {
        if (category && parseInt(category) > 0) {
            q = q.where(
                this.table.category_id.equals(parseInt(category))
            )
        }
        return q
    }

    getTotalCount(connection, queryParams) {
        let q = this.table
            .select(this.table.count())
            .from(this.table)
        ;

        q = this.setCategoryCondition(queryParams.category, q)
        q = q.toQuery('mysql')

        return new Promise((resolve, reject) => {
            connection.query(q.text, q.values, (err, res) => {
                if (err) return reject(err)

                return resolve(res[0].phrases_count)
            })
        })
    }

    getQueryForNext(queryParams) {
        let q = this.table
            .select(this.table.star())
            .from(this.table)
        ;

        q = this.setCategoryCondition(queryParams.category, q)

        if (parseInt(queryParams.lastId) > 0) {
            q = q.where(
                this.table.id.gt(parseInt(queryParams.lastId))
            )
        }

        return q.order('id').limit(1)
    }
}