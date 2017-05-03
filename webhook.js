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
       let responseText = '';
       switch(result.action){
        case 'courseLevel':
            if (result.parameters.EducationLevel == 'PostSecondary'){
                responseText = `Certification or Diploma courses are best for ${result.parameters.EducationLevel}. Would you like to do Certification or Diploma program ?`;
            } else if (result.parameters.EducationLevel == 'Graduate'){
                responseText = `Degree or PostGraduate courses are best for ${result.parameters.EducationLevel}. Would you like to do Degree or Post graduate program ?`;
            } else if (result.parameters.EducationLevel == 'PostGraduate'){
                responseText = `Degree or PostGraduate courses are best for ${result.parameters.EducationLevel}. Would you like to do Degree or Post graduate program ?`;
            }
            break;
        case 'offerProgram':
            responseText = `That's great. ${result.parameters.ProgramName} is a very good choice. In which field are you interested in? e.g. Accounting, Management, Engineering, MBA etc.`;
            break;
        case 'offerCourses':
            responseText = `Awesome. ${result.parameters.Courses}`;
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