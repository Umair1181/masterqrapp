const AttendenceModel = require("../Controllers/Attendence/model");
class Attendence {
  PrepArray = [];
  constructor() {}

  CheckStudentMarkedAttendence = async (enrolments, date) => {
    let prepObject = {};
    for (let index = 0; index < enrolments.length; index++) {
      const element = enrolments[index];
      console.log({
        markInDate: date,
        course: element?.course?._id,
        student: element?.student?._id,
      });
      let foundRecord = await AttendenceModel.findOne({
        markInDate: date,
        course: element?.course?._id,
        student: element?.student?._id,
      });
      prepObject = { ...element, present: foundRecord ? true : false };
      this.PrepArray.push(prepObject);
    }
    return this.PrepArray;
  };
}

const MyAttendenceBusinessLogic = new Attendence();
module.exports = MyAttendenceBusinessLogic;
