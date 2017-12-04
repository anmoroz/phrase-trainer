'use strict'

const manifest = require('../package.json')

const App = require('koa')
const AppLogger = require('koa-logger')
const AppStatic = require('koa-static')
const AppRouter = require('koa-router')

// CONFIG

const config = manifest.config

config.port = process.env.PORT || config.port

config.mysql = config.mysql || {}
config.mysql.host = process.env.MYSQL_PORT_3306_TCP_ADDR || config.mysql.host
config.mysql.port = process.env.MYSQL_PORT_3306_TCP_PORT || config.mysql.port
config.mysql.user = process.env.MYSQL_USER || config.mysql.user
config.mysql.password = process.env.MYSQL_PASSWORD || config.mysql.password


// APP

const app = new App

app.use(AppLogger())

// DB

const mysql = require('mysql')
const mysqlPool = mysql.createPool(config.mysql)

app.context.mysqlPool = mysqlPool


// Router

const router = AppRouter()

const PhrasesService = require('./services/PhrasesService')
let phrasesService = new PhrasesService()

router.get('/phrase', async (ctx, next) => {
    if (ctx.request.query.shuffle === 'true') {
        ctx.body = await phrasesService.queryRandom(ctx.mysqlPool, ctx.request.query)
    } else {
        ctx.body = await phrasesService.queryNext(ctx.mysqlPool, ctx.request.query)
    }
});

const CategoryService = require('./services/CategoryService')
let categoryService = new CategoryService()

router.get('/category', async (ctx, next) => {
    ctx.body = await categoryService.getAll(ctx.mysqlPool)
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(AppStatic('./public'))
    .listen(config.port, function () {
        console.log('app listening on port: %d', config.port)
    })
;