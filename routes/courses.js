var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') 

// courseid, departmentid, coursename, nosemester, feepersemester, icon

router.post('/addcourses',upload.single("icon"),function(req,res){
    pool.query("insert into courses (departmentid, coursename, nosemester, feepersemester, icon) values (?,?,?,?,?)",[req.body.departmentid, req.body.coursename, req.body.nosemester, req.body.feepersemester,req.filename],function(error,result){
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

router.get('/displayallcourses',function(req,res){
    
    pool.query("select C. * ,(select D.departmentname from department D where D.departmentid = C.departmentid) as departmentname  from courses C",function(error,result){
        
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



router.post('/editcoursesicon',upload.single("icon"),function(req,res){
    pool.query("update courses set icon=? where courseid=?",[req.filename,req.body.courseid],function(error,result){
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

router.post('/editcourses',function(req,res){
    pool.query("update courses set departmentid=?, coursename=?, nosemester=?, feepersemester=?  where courseid=?",[req.body.departmentid, req.body.coursename, req.body.nosemester, req.body.feepersemester,req.body.courseid],function(error,result){
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

router.post('/deletecourses',function(req,res){

    pool.query("delete from courses where courseid=?",[req.body.courseid],function(error,result){
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
