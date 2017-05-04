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
                responseText = `Certification or Diploma courses are best for ${result.parameters.EducationLevel} students. Would you like to do Certification, Diploma, or Degree program ?`;
            } else if (result.parameters.EducationLevel == 'Graduate'){
                responseText = `Bachelor's or Master's degree courses are best for ${result.parameters.EducationLevel} students. Would you like to do Bachelor's or Master's degree ?`;
            } else if (result.parameters.EducationLevel == 'PostGraduate'){
                responseText = `Master's degree or specialized Certification are best for ${result.parameters.EducationLevel} students. Would you like to do Master's or certification ?`;
            } else if (result.parameters.EducationLevel == 'Diploma'){
                responseText = `Bachelor's Degree or Certification courses are best for ${result.parameters.EducationLevel} students. Would you like to do Degree or Certification program ?`;
            } else {
                responseText = `Diploma or Certification courses are very popular. Would you like to do Diploma or Certification program ?`;
            }
            break;
        case 'offerProgram':
            responseText = `That's great. ${result.parameters.EducationLevel} is a very good choice. In which field are you interested in? e.g. Accounting, Management, Engineering, MBA etc.`;
            break;
        case 'offerCourses':
            responseText = `Awesome. ${result.parameters.Courses} has a good scope. Please contact Anil from Gyanvarsha at Phone # +91 9210214031.`;
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