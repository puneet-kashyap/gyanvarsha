'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "GyanvarshaBot"
});

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://chatbot:chatbot@ds133331.mlab.com:33331/gyanvarsha';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var cursor = db.collection('users_info').find( );
  cursor.each(function(err,doc){
      console.log(doc);
  })
  console.log("Connected successfully to MongoDb server");

  db.close();
});

const request = require('request');
const PORT = process.env.PORT || 3001;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

server.get('/', (req, res, next) => {
  res.send('Hello World');
  return next();
});

const currentEducation = (edu) => {
    if (edu == 'PostSecondary'){
        responseText = `Degree or Diploma courses are best for ${edu} students. Would you like to do Certification, Diploma, or Degree program ?`;
    } else if (edu == 'Graduate'){
        responseText = `Master's degree courses are best for ${edu} students. Would you like to do Bachelor's or Master's degree ?`;
    } else if (edu == 'PostGraduate'){
        responseText = `Master's degree or specialized Certification are best for ${edu} students. Would you like to do Master's or certification ?`;
    } else if (edu == 'Diploma'){
        responseText = `Bachelor's Degree or Certification courses are best for ${edu} students. Would you like to do Degree or Certification program ?`;
    } else {
        responseText = `Certification courses are very popular. Would you like to do Diploma or Certification program ?`;
    }
    return responseText;
}

server.post('/', (req, res, next) => {
    let { status, result } = req.body;

   if (status.code === 200){
       let responseText = '';
       switch(result.action){
        case 'courseLevel':
            console.log('>>> ' +currentEducation(result.parameters.EducationLevel));
            if (result.parameters.EducationLevel == 'PostSecondary'){
                responseText = `Degree or Diploma courses are best for ${result.parameters.EducationLevel} students.\nWould you like to do Certification, Diploma, or Degree program ?`;
            } else if (result.parameters.EducationLevel == 'Graduate'){
                responseText = `Master's degree courses are best for ${result.parameters.EducationLevel} students.\nWould you like to do Bachelor's or Master's degree ?`;
            } else if (result.parameters.EducationLevel == 'PostGraduate'){
                responseText = `Master's degree or specialized Certification are best for ${result.parameters.EducationLevel} students.\nWould you like to do Master's or certification ?`;
            } else if (result.parameters.EducationLevel == 'Diploma'){
                responseText = `Bachelor's Degree or Certification courses are best for ${result.parameters.EducationLevel} students.\nWould you like to do Degree or Certification program ?`;
            } else {
                responseText = `Certification courses are very popular.\nWould you like to do Diploma or Certification program ?`;
            }
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