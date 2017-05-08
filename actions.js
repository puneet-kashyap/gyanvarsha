exports.currentEducation = (edu) => {
    let responseCurrentEducation='';
    if (edu == 'PostSecondary'){
        responseCurrentEducation = `Degree or Diploma courses are best for ${edu} students.\r\nWould you like to do Certification, Diploma, or Degree program ?`;
    } else if (edu == 'Graduate'){
        responseCurrentEducation = `Master's degree courses are best for ${edu} students.\r\nWould you like to do Bachelor's or Master's degree ?`;
    } else if (edu == 'PostGraduate'){
        responseCurrentEducation = `Master's degree or specialized Certification are best for ${edu} students.\r\nWould you like to do Master's or certification ?`;
    } else if (edu == 'Diploma'){
        responseCurrentEducation = `Bachelor's Degree or Certification courses are best for ${edu} students.\r\nWould you like to do Degree or Certification program ?`;
    } else {
        responseCurrentEducation = `Certification courses are very popular.\r\nWould you like to do Diploma or Certification program ?`;
    }
    return responseCurrentEducation;
}
