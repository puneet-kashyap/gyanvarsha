'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "GyanvarshaBot"
});
const request = require('request');
const PORT = process.env.PORT || 3001;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

server.get('/', (req, res, next) => {
  res.send('Hello World');
  return next();
});

server.post('/', (req, res, next) => {
    let { status, result } = req.body;

   if (status.code === 200){
       switch(result.action){
        case 'courseLevel':
                res.json({
                speech: "Hello speech from webhook",
                displayText: "Hello from webhook",
                source: "gyanvarsha-webhook",
                });
        default: 
                res.json({
                speech: "Oops, something went wrong",
                displayText: "Oops, something went wrong",
                source: "gyanvarsha-webhook",
                });
        }
    }
    return next();
});

server.listen(PORT, () => console.log(`GyanvarshaBot running on ${PORT}`));