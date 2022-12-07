const { TEACHER_PASS } = require("../consts");
const { GeneralConrtller } = require("../generalController");
const TeacherModel = require("./model");
const addTeacher = async (req, res) =>  {
                let file = req.file;
                if( !file ){
                    return GeneralConrtller.ResponseObj( res, 409, "Image Missing", null, false) 
                }
                let { data } = req.body;
                console.log( "data: ", JSON.parse(data) )
                data =  {...JSON.parse(data)};
                let dimPass = TEACHER_PASS;
        
                let image = { url: `/image/${file?.filename}`, name: file?.originalname }
        
                let generatedPass = await GeneralConrtller.PrepPassword(dimPass);
                // checking repeated data
                if( await getSingleTeacher({ $or: [{ cnic: data?.cinc }] }) ){
                        return GeneralConrtller.ResponseObj( res, 403, "Cnic is Repeated", null, false)
                }
                // generating Pasword with encyption 
                if(!generatedPass){
                        return GeneralConrtller.ResponseObj( res, 400, "Password Encryption Failed", null, false)
                }
                try {
                        let newTeacher = new TeacherModel({
                                firstName: data?.firstName,
                                lastName: data?.lastName,
                                cnic: data?.cnic,
                                gender: data?.gender,
                                subjectId: data.subjectId,
                                image: image,
                                password: generatedPass
                        })
                        let createdTeacher =  await newTeacher.save();
                        return GeneralConrtller.ResponseObj( res, 200, "Teacher  added Successfully", createdTeacher, true) 
                } catch (error) {
                        console.log( "error: ", error )
                        return GeneralConrtller.ResponseObj( res, 400, GeneralConrtller.handleError(error), error, false)   
                }
}




const getSingleTeacher = async (data) => {
        let gotData = await TeacherModel.findOne(data);
        if(gotData){
            return gotData;
        }else{
            return false;
        }
    }

const allTeachers = async ( req, res ) => {
    let teachers = await TeacherModel.find();

    return res.status(200).json( { msg: "Teachers", 
            success: teachers?.length > 0 ? true: false,
            results: teachers
    } );
}

const removeTeachers = async ( req, res ) => {
    let teachers = await TeacherModel.deleteMany();

    return res.status(200).json( { msg: "Removed Successfully", 
            success: true,
            teachers: false// teachers
    } );
}

const login = async ( req, res ) => {
        let data = req.body.data;
        console.log( "input: ", data )
        let fUser = await TeacherModel.findOne({ cnic: data?.cnic });
        if( fUser ){
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
                return res.status(200).json( { msg: "Invalid Cnic", 
                        success: false,
                        results: null
                } ); 
        }
}

const block = async (req, res) => {
        let _id = req.params._id;
        console.log(_id, "_id" )
        try {
                let fUser = await TeacherModel.findOne({ _id: _id });
                let updated = await TeacherModel.findOneAndUpdate({ _id : _id }, { blocked: !fUser.blocked }, {new :true});
                return GeneralConrtller.ResponseObj( res, 200, "Updated Successfullfy", updated, true)   

        } catch (error) {
                return GeneralConrtller.ResponseObj( res, 400, "Failed", error, false)   
        }
        
}

module.exports = {addTeacher, 
    getSingleTeacher,
    allTeachers,
    removeTeachers,
    login,
    block
}