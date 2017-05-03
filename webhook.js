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
            res.json({
            speech: `That's great. ${result.parameters.ProgramName} is a very good choice. In which field are you interested in? e.g. Accounting, Management, Engineering, MBA etc.`,
            displayText: `That's great ${result.parameters.ProgramName} is a very good choice. In which field are you interested in? e.g. Accounting, Management, Engineering, MBA etc.`,
            source: "gyanvarsha-webhook",
            });
            break;
        case 'offerCourses':
            res.json({
            speech: `Awesome. ${result.parameters.Courses}`,
            displayText: `Awesome. ${result.parameters.Courses}`,
            source: "gyanvarsha-webhook",
            });
            break;
        default: 
            res.json({
            speech: "Oops, something went wrong",
            displayText: "Oops, something went wrong",
            source: "gyanvarsha-webhook",
            });
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