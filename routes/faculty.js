var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer') 


router.post('/addfaculty',upload.single("icon"),function(req,res){
    
    pool.query("insert into faculties (firstname, lastname, fathername, gender, dob, qualification, department, address, state, city, mobileno, alternatemobileno, emailid, designation,password, picture) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.fathername,req.body.gender,req.body.date,req.body.qualification,req.body.department,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.alternatemobileno,req.body.email,req.body.designation,req.body.password,req.filename],function(error,result){
       
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Submitted"})
        }
    })
})

router.get('/displayallfaculty',function(req,res){
    
    pool.query("select F. * ,(select D.departmentname from department D where D.departmentid = F.department) as departmentname ,(select S.statename from states S where S.stateid = F.state) as statename , (select C.cityname from cities C where C.cityid = F.city) as cityname from faculties F",function(error,result){
        
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

router.post('/editfacultyicon',upload.single("icon"),function(req,res){
  
    pool.query("update faculties set picture=? where facultyid=?",[req.filename,req.body.facultyid],function(error,result){
        console.log("Body",req.body,"File",req.file)
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {  console.log(result)
            
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})


router.post('/editfaculty',function(req,res){

    pool.query("update faculties set firstname=?, lastname=?, fathername=?, gender=?, dob=?, qualification=?, department=?, address=?, state=?, city=?, mobileno=?, alternatemobileno=?, emailid=?, designation=?, password=? where facultyid=?",[req.body.firstname,req.body.lastname,req.body.fathername,req.body.gender,req.body.dob,req.body.qualification,req.body.department,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.alternatemobileno,req.body.emailid,req.body.designation,req.body.password,req.body.facultyid],function(error,result){
        
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


router.post('/deletefaculty',function(req,res){

    pool.query("delete from faculties where facultyid=?",[req.body.facultyid],function(error,result){
       
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