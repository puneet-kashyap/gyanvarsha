'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "GyanvarshaBot"
});
const actions = require('./actions');
const database = require('./database');

const request = require('request');
const PORT = process.env.PORT || 3001;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

server.get('/', (req, res, next) => {
  res.send('Hello World');
  return next();
});

console.log(actions.currentEducation('Graduate'));
database.initiatelDB();

server.post('/', (req, res, next) => {
    let { status, result } = req.body;
   if (status.code === 200){
       let responseText = '';
       switch(result.action){
        case 'courseLevel':
            responseText = actions.currentEducation(result.parameters.EducationLevel);
            break;
        case 'offerProgram':
            responseText = `That's great. ${result.parameters.EducationLevel} is a very good choice. In which field are you interested in? e.g. Accounting, Management, Engineering, MBA etc.`;
            break;
        case 'offerCourses':
            responseText = `Awesome. ${result.parameters.Courses} has a good scope. Please contact Anil from Gyanvarsha at Phone # +91 9210214031 for further assistance.`;
            break;
        default: 
            responseText = "Oops, something went wrong";
        }
            res.json({
            speech: responseText,
            displayText: responseText,
            source: "gyanvarsha-webhook",
            });
    }
    return next();
});

server.listen(PORT, () => console.log(`GyanvarshaBot running on ${PORT}`));