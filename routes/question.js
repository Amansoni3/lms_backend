var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/fetchallunits',function(req,res){
    
    pool.query("select * from units where subjectid = ?",[req.body.subjectid],function(error,result){
        
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

router.post('/fetchallsets',function(req,res){
    
    pool.query("select * from createset where subjectid = ?",[req.body.subjectid],function(error,result){
        
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

router.post('/addquestion',upload.any(),function(req, res, next) {
    pool.query("insert into questions (facultyid, departmentid, courseid, semester, subjectid, setid, unitid, questionnumber, question, questionimage, option1, image1, option2, image2, option3, image3, option4, image4, correctanswer) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.facultyid, req.body.departmentid, req.body.courseid, req.body.semester, req.body.subjectid, req.body.setid, req.body.unitid, req.body.questionnumber, req.body.question, req.files[0].filename, req.body.option1, req.files[1].filename, req.body.option2, req.files[2].filename, req.body.option3, req.files[3].filename, req.body.option4, req.files[4].filename, req.body.correctanswer],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msg:'Server Error....'})
    }
    else
    {console.log(result)
      res.status(200).json({result:true,msg:'Submitted....'})
    }
  })
  });

  router.post('/generatequestionnumber',function(req,res){

    pool.query("select count(*) as qno from questions where setid = ?",[req.body.setid],function(error,result){

        if(error){

            res.status(500).json({result:[]})
        }
        else{

            if(result[0].qno == null){

                res.status(200).json({result:1})

            }
            else{
                
                res.status(200).json({result:parseInt(result[0].qno)+1})
            }
        }
    })
 })







module.exports = router;