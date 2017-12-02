'use strict'

const phrase = require('./phrase')

const App = require('koa')
const AppLogger = require('koa-logger')
const AppStatic = require('koa-static')
const AppRouter = require('koa-router')

const PORT = 8000

const app = new App();
const router = AppRouter()

router.get('/random-phrase', async (ctx, next) => {
    var crud = phrase()
    ctx.body = await crud.getRandom()
});

app
    .use(AppLogger())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(AppStatic('./public'))
    .listen(PORT, function () {
        console.log('app listening on port: %d', PORT)
    })
;