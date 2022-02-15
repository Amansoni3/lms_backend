var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer'); 
const { query } = require('express');

// subjectid, courseid, departmentid, semester, subjectname, type, subjectsmarks, practicalmarks

router.post('/displayallcoursesbyid',function(req,res){
    
    pool.query("select * from courses where departmentid = ? ",[req.body.departmentid],function(error,result){
        
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

 router.post('/displaysemesterbycoursesid',function(req,res){
    
   pool.query("select * from courses where courseid = ? ",[req.body.courseid],function(error,result){
       
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

router.post('/displaysubjectsbysemester',function(req,res){
    
   pool.query("select * from subjects where courseid = ? and semester = ?",[req.body.courses,req.body.semester],function(error,result){
   console.log('zzzzzz',req.body)

       if(error)
       {  console.log('xxxx',error)
          res.status(500).json({result:[]})
       }
       else
       {  console.log('result',result)

          res.status(200).json({result:result})
       }
   })
})


router.post('/addsubjects',function(req,res){

   pool.query("insert into subjects ( departmentid, courseid, semester, subjectname, type, subjectsmarks) values (?,?,?,?,?,?)",[ req.body.departmentid, req.body.courseid, req.body.semester, req.body.subjectname, req.body.type, req.body.subjectsmarks],function(error,result){
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

router.get('/displayallsubjects',function(req,res){
    
   pool.query("select S.* ,( select D.departmentname from department D where D.departmentid=S.departmentid ) as departmentname , (select C.coursename from courses C where C.courseid =  S.courseid) as coursename from subjects S",function(error,result){
       
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

router.post('/editsubjects',function(req,res){

   pool.query("update subjects set departmentid=?, courseid=?, semester=?, subjectname=?, type=?, subjectsmarks=? where subjectid=?",[req.body.departmentid, req.body.courseid, req.body.semester, req.body.subjectname, req.body.type, req.body.subjectsmarks,req.body.subjectid],function(error,result){
       
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



router.post('/deletesubjects',function(req,res){

   pool.query("delete from subjects where subjectid=?",[req.body.subjectid],function(error,result){
    console.log('XXXXXX',req.body)
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


router.post('/displaysubjectsbycourses',function(req,res){
    
   pool.query("select * from subjects where courseid = ? ",[req.body.courses],function(error,result){
       
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




module.exports = router;
