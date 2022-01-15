var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


//   enrollmentno, studentname, fathername, mothername, category, nationality, gender, dob, mobileno,
//   parentmobileno, cstate, ccity, caddress, pstate, pcity, paddress, emailid, parentoccupation,
//   annualincome, aadhaarno, uploadaadhaar, domicilestate, uploaddomicle, departmentid, courseid,
//   password, picture


router.post('/addstudents', upload.any(), function (req, res) {
    console.log(req.body)
    pool.query("insert into students (enrollmentno,studentname, fathername, mothername, category, nationality, gender, dob, mobileno, parentmobileno, cstate, ccity, caddress, pstate, pcity, paddress, emailid, parentoccupation, annualincome, aadhaarno, uploadaadhaar, domicilestate, uploaddomicle, departmentid, courseid, password, picture) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.enrollmentno,req.body.studentname, req.body.fathername, req.body.mothername, req.body.category, req.body.nationality, req.body.gender, req.body.dob, req.body.mobileno, req.body.parentmobileno, req.body.cstate, req.body.ccity, req.body.caddress, req.body.pstate, req.body.pcity, req.body.paddress, req.body.emailid, req.body.parentoccupation, req.body.annualincome, req.body.aadhaarno, req.files[0].filename, req.body.domicilestate, req.files[1].filename, req.body.departmentid, req.body.courseid, req.body.password, req.files[2].filename], function (error, result) {
            
        if (error) {
            console.log(error)
            res.status(500).json({ result: false, msg: "Server Error" })
        }
        else {
            console.log(result)
            res.status(200).json({ result: true, msg: "Record Submitted" })
        }
    })
})

router.get('/displayallstudents',function(req,res){
    
    pool.query("select S.*,(select CS.statename from states CS where CS.stateid=S.cstate) as cstatename ,(select CC.cityname from cities CC where CC.cityid=S.ccity) as ccityname , (select PS.statename from states PS where PS.stateid=S.pstate) as pstatename ,(select PC.cityname from cities PC where PC.cityid=S.pcity) as pcityname , (select DS.statename from states DS where DS.stateid=S.domicilestate) as dstatename , (select D.departmentname from department D where D.departmentid = S.departmentid) as departmentname , (select C.coursename from courses C where C.courseid = S.courseid) as coursename from students S ",function(error,result){
        
        if(error)
        {  
           res.status(500).json({result:[]})
        }
        else
        {
           res.status(200).json({result:result})
        }
    })
})

router.post('/editstudentpicture',upload.single("icon"),function(req,res){
    pool.query("update students set picture = ? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})

router.post('/editstudentaadhaar',upload.single("icon"),function(req,res){

    pool.query("update students set uploadaadhaar = ? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
       
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})

router.post('/editstudentdomicile',upload.single("icon"),function(req,res){
    
    pool.query("update students set uploaddomicle = ? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
       
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})


router.post('/editstudentparentsdata',function(req,res){

    pool.query("update students set fathername=? , mothername=? , parentmobileno=? , pstate=?,pcity=?,paddress=?,parentoccupation=?,annualincome=?,aadhaarno=?,domicilestate=? where enrollmentno=?",[req.body.fathername,req.body.mothername,req.body.parentmobileno,req.body.pstate,req.body.pcity,req.body.paddress,req.body.parentoccupation,req.body.annualincome,req.body.aadhaarno,req.body.domicilestate,req.body.enrollmentno ],function(error,result){
        
        if(error)
        {  
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {  
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })
})  

router.post('/editstudents',function(req,res){

    pool.query("update students set studentname=?, category=?, nationality=?, gender=?, dob=?, mobileno=?,cstate=?, ccity=?, caddress=?, emailid=?, departmentid=?, courseid=?, password=? where enrollmentno=?",[req.body.studentname, req.body.category, req.body.nationality, req.body.gender, req.body.dob, req.body.mobileno,req.body.cstate, req.body.ccity, req.body.caddress, req.body.emailid, req.body.departmentid, req.body.courseid, req.body.password, req.body.enrollmentno],function(error,result){
        
        if(error)
        {  
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {  
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })
})  


router.post('/deletestudents',function(req,res){

    pool.query("delete from students where enrollmentno=?",[req.body.enrollmentno],function(error,result){
       console.log(req.body)
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Deleted"})
        }
    })
})








module.exports = router;
