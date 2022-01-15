var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/adddepartment',upload.single("icon"),function(req,res){
    pool.query("insert into department (departmentname,departmenticon) values (?,?)",[req.body.departmentname,req.filename],function(error,result){
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

router.post('/editdepartment',function(req,res){
    pool.query("update department set departmentname=? where departmentid=?",[req.body.departmentname,req.body.departmentid],function(error,result){
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

router.post('/editdepartmenticon',upload.single("icon"),function(req,res){
    pool.query("update department set departmenticon=? where departmentid=?",[req.filename,req.body.departmentid],function(error,result){
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

router.post('/deletedepartment',function(req,res){
    pool.query("delete from department where departmentid=?",[req.body.departmentid],function(error,result){
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

router.get('/displayall',function(req,res){
    
    pool.query("select * from department",function(error,result){
        
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
