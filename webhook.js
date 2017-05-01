'use strict';

const Restify = require('restify');
const server = Restify.createServer({
    name: 'GyanvarshaBot'
});

const PORT = process.env.PORT || 3000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

server.get('/', (req, res, next) => {
  res.send('Hello World');
  return next();
});

server.post('/', (req, res, next) => {
    let {
        status,
        result
    } = req.body;

    if (status === 200 && result.action === 'courseLevel'){
        res.json({
            displayText: 'Hello world from webhook',
            source: 'webhook'
        });
        return next();
    }
});

server.listen(PORT, () => console.log(`GyanvarshaBot running on ${PORT}`));