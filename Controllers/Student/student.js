const StudentModel = require("./model");
// var multiparty = require('multiparty');
const { GeneralConrtller } = require("../generalController");
const addStudent = async ( req, res ) => {
        let data = req.body.data;
        console.log( "data: ", data )
        // var form = new multiparty.Form();
        // form.parse(req, (err, fields, files) => {
        //     // fields fields fields
        //     console.log( "fields: ", fields.email )
        // });
        // console.log( "student: ", student );
        let dimPass = "student123";
        let generatedPass = await GeneralConrtller.PrepPassword(dimPass);
        if(!generatedPass){
                return res.status(200).json( { 
                        msg: "Password Encryption Failed", 
                        data: null,
                        success: false
                } );
        }
        let newStudent = new StudentModel({
                firstName: data?.firstName,
                lastName: data?.lastName,
                // dob: 
                // gender:
                // image:
                // resetPassCode: 
                regNumber: data?.regNumber,
                password: generatedPass
        })
        let createdStudent =  await newStudent.save();
        return res.status(200).json( { 
                msg: "Student added Successfully", 
                results: createdStudent,
                success: true
        } );


}

const getSingleStudent = async ( req, res ) => {
        return res.json( { msg: "check" } )
}

const scanQr = async ( req, res ) => {
        
        return res.json( { msg: "check: scanQr" } )
}

const allStudents = async ( req, res ) => {
        let students = await StudentModel.find();

        return res.status(200).json( { msg: "check: allStudents", 
                success: students?.length > 0 ? true: false,
                results: students
        } );
}

const removeStudents = async ( req, res ) => {
        // let students = await StudentModel.deleteMany();

        return res.status(200).json( { msg: "Removed Successfully", 
                success: true,
                students: students
        } );
}

const login = async ( req, res ) => {
        let data = req.body.data;
        console.log( "input: ", data )
        let fUser = await StudentModel.findOne({ regNumber: data?.regNumber });
        if( fUser ){
                console.log( "fUser?.password: ", fUser?.password )
                let verfied = await GeneralConrtller.ComparePassword( data?.password, fUser?.password);
                if( verfied ){
                        return res.status(200).json( { msg: "Loged In Successfully", 
                                success: true,
                                results: fUser
                        } ); 
                }else{
                        return res.status(200).json( { msg: "Invalid Password", 
                                success: false,
                                results: null
                        } ); 
                }       
        }else{
                return res.status(200).json( { msg: "Invalid Registration Number", 
                        success: false,
                        results: null
                } ); 
        }
}

module.exports = {addStudent, scanQr, getSingleStudent, allStudents, removeStudents, 
        login}