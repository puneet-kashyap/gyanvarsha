'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "GyanvarshaBot"
});
const request = require('request');
const PORT = process.env.PORT || 3000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

server.get('/', (req, res, next) => {
  res.send('Hello World');
  return next();
});

server.post('/', (req, res, next) => {
console.log(req.body.result.action);
   if (req.body.status = 200 && req.body.result.action == "courseLevel"){
        res.json({
            speech: "Hello speech from webhook",
            displayText: "Hello from webhook",
            source: "gyanvarsha-webhook",
        });
        console.log('Error == '+res.body);
    } else {
        res.json({
            speech: "Hello00 speech from webhook",
            displayText: "Hello00 from webhook",
            source: "gyanvarsha-webhook",
        });
        
    }
    return next();
});

server.listen(PORT, () => console.log(`GyanvarshaBot running on ${PORT}`));