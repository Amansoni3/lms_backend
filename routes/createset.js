var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')


router.post('/addset', function (req, res) {
    console.log(req.body)
    pool.query("insert into createset (facultyid, departmentid, courseid, subjectid, setno, time, status, marks, semester) values (?,?,?,?,?,?,?,?,?)", [req.body.facultyid, req.body.departmentid, req.body.courseid, req.body.subjectid, req.body.setno, req.body.time, req.body.status, req.body.marks, req.body.semester], function (error, result) {
            
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

 router.get('/generateset',function(req,res){

    pool.query("select max(setid) as setnum from createset",function(error,result){

        if(error){

            res.status(500).json({result:[]})
        }
        else{

            if(result[0].setnum == null){

                res.status(200).json({result:1})

            }
            else{
                
                res.status(200).json({result:parseInt(result[0].setnum)+1})
            }
        }
    })
 })

 router.post('/displayallcreateset',function(req,res){
    
    pool.query("select C.* ,(select D.departmentname from department D where D.departmentid=C.departmentid) as departmentname , (select CS.coursename from courses CS where CS.courseid=C.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid=C.subjectid) as subjectname from createset C where facultyid = ?",[req.body.facultyid],function(error,result){
        console.log(req.query)
        if(error)
        {  console.log(error)
           res.status(500).json({result:[]})
        }
        else
        {  console.log(result)
           res.status(200).json({result:result})
        }
    })
})






module.exports = router;