var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer') 


router.post('/addunits',function(req,res){
    pool.query("insert into units (departmentid, courseid, subjectid, unitno, title, description) values (?,?,?,?,?,?)",[req.body.departmentid, req.body.courseid, req.body.subjectid, req.body.unitno, req.body.title, req.body.description],function(error,result){
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

router.get('/displayallunits',function(req,res){
    
    pool.query("select U.*,(select D.departmentname from department D where D.departmentid = U.departmentid ) as departmentname,(select C.coursename from courses C where C.courseid = U.courseid ) as coursename , (select S.subjectname from subjects S where S.subjectid = U.subjectid ) as subjectname,(select S.type from subjects S where S.subjectid = U.subjectid ) as subjecttype,(select S.semester from subjects S where S.subjectid = U.subjectid ) as semester from units U",function(error,result){
        
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

router.post('/editunits',function(req,res){
    pool.query("update units set departmentid=?, courseid=?, subjectid=?, unitno=?, title=?, description=?  where unitid=?",[req.body.departmentid, req.body.courseid, req.body.subjectid, req.body.unitno, req.body.title, req.body.description,req.body.unitid],function(error,result){
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

router.post('/deleteunits',function(req,res){
    pool.query("delete from units where unitid=?",[req.body.unitid],function(error,result){
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
