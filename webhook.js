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

   if (req.body.status === 200 && req.body.action === 'courseLevel'){
        res.setHeader('content-type', 'application/json');
        res.send({
            speech: 'Hello speech from webhook',
            displayText: 'Hello from webhook',
            source: 'gyanvarsha-webhook'    
        });
    }
    return next();
});

server.listen(PORT, () => console.log(`GyanvarshaBot running on ${PORT}`));