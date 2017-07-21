const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const enforceHttps = require('koa-sslify');
const responseTime = require('koa-response-time');

const app = new Koa();
const router = new Router();

// fake DB
const db = require('./db.json');

// Force HTTPS on all page
app.use(enforceHttps());
// Adds a X-Response-Time HTTP header
app.use(responseTime());
// Development logging to console
app.use(logger());
// Apply our routes
app.use(router.routes());

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = db;
});

router.get('/:id', async (ctx) => {
  let id = +ctx.params.id;
  ctx.set('Content-Type', 'application/json');
  ctx.body = db.filter((i) => i._id === id);
});

//const PORT = 1337;
//app.listen(PORT);
//console.log(`Listening on ${PORT}, env is ${process.env.NODE_ENV}`);

// SSL options
let options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};

https.createServer(options, app.callback()).listen(443);
console.log('Running...');
