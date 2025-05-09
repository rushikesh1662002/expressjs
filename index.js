require('dotenv').config();
let express = require("express");
let db = require("./db");
app.use(express.json());
const { escapeXML } = require("ejs");
let app = express();
let port_no = process.env.PORT || 7000;

//registerd views and public folder
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));  //for database

// default module
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Course Master module
app.get("/addCourse", (req, res) => {
    res.render("addCourse.ejs", { msg: null });
});
app.post("/addCourseData", (req, res) => {
    let cname = req.body.cname;
    db.query("insert into course values ('0',?)", [cname], (err, result) => {
        if (err) {
            console.log("Some Problem!!!", err);
        }
        else {
            res.render("addCourse.ejs", { msg: "Course added successfully..." });
        }
    });
});

// app.get("/viewCourse", (req, res) => {
//     res.render("viewCourse.ejs");
// });
app.get("/viewCourse", (req, res) => {
    db.query("select * from course", (err, result) => {
        if (err) {
            console.log("Some Problem!!!", err);
        }
        else {
            res.render("viewCourse.ejs", { data: result });
        }
    });
});
app.get("/searchCourse",(req,res)=>{
    let cname = req.query.cname;

    db.query("select * from course where cname like ?",[`%${cname}%`],(err,result)=>{
        if(err){
            console.log("Some problem!!!",err);
        }
        else{
            res.json(result);
        }
    });
});
app.get("/deleteCourse",(req, res)=>{
    let cid = parseInt(req.query.cid);
    db.query("delete from course where cid=?",[cid],(err,result)=>{
        if(err){
            console.log("Some problem!!!",err);
        }
        else{
            res.redirect("/viewCourse");
        }
    });
});
app.get("/edit",(req,res)=>{
    let cid = req.query.cid;
    db.query("select * from course where cid=?",[cid],(err,result)=>{
         if(err){
            console.log("Some problem!!!",err);
         }
         else{
            res.render("updateCourse.ejs",{data:result[0]});
         }
    });
});
app.post("/updateCourse",(req,res)=>{
    let cid = parseInt(req.body.cid);
    let cname = req.body.cname;
    db.query("update course set cname= ? where cid= ?",[cname,cid],(err,result)=>{
         if(err){
            console.log("Some problem!!!",err);
         }
         else{
            res.redirect("/viewCourse");
         }
    });
});
// Student master module
app.get("/addStudent", (req, res) => {
    db.query("select * from course",(err,result)=>{
        if(err){
            console.log("Some problem!!!",err); 
        }
        else{
            res.render("addStudent.ejs",{courses:result,
                                         msg:""
            });
        }
    });
});
app.post("/addStudentData",(req,res)=>{
    let name = req.body.sname;
    let email = req.body.semail;
    let contact = req.body.scontact;
    let cid = parseInt(req.body.cid);
    db.query("insert into student values(?,?,?,?,?)",['0',name,email,contact,cid],(err,result)=>{
          if(err){
            console.log("Some problem!!!",err); 
          }
          else{
            db.query("select * from course",(err2,courseResult)=>{
                if(err2){
                    console.log("Some problem!!!",err2); 
                }
                else{
                    res.render("addStudent.ejs",{courses:courseResult,msg:"Student enroll successfully..."});
                }
            });
          }
    });
});
app.get("/viewStudent", (req, res) => {
    db.query("select s.*,c.cname from student s join course c on s.cid=c.cid",(err,result)=>{
        if(err){
            console.log("Some problem!!!",err); 
        }
        else{
            res.render("viewStudent.ejs",{data:result});
        }
    });
});
app.get("/deleteStudentById",(req,res)=>{
    let sid = parseInt(req.query.sid);
    db.query("delete from student where sid=?",[sid],(err,result)=>{
        if(err){
            console.log("Some problem!!!",err); 
        }
        else{
            res.redirect("/viewStudent");
        }
    });
});
app.get("/updateStudentById",(req,res)=>{
    let sid = parseInt(req.query.sid);
    if (isNaN(sid)) {
        return res.redirect("/viewStudent");
    }
    db.query("select * from student where sid=?",[sid],(err,studentResult)=>{
        if(err || studentResult.length===0){
            console.log("Some problem!!!",err);
            res.render("/viewStudent");
        }
        db.query("select * from course",(err2,courseResult)=>{
            if(err2 || courseResult.length===0){
                console.log("Some problem!!!",err);
                res.render("/viewStudent");
            }
            else{
                res.render("updateStudent.ejs",{student:studentResult[0],
                                                courses:courseResult,
                                                msg:""
                });
            }
        });
    });
});
app.post("/updateStudentData",(req,res)=>{
    let sid = parseInt(req.body.sid);
    let sname = req.body.sname;
    let semail = req.body.semail;
    let scontact = req.body.scontact;
    let cid = parseInt(req.body.cid);

    db.query("update student set sname=?, semail=?, scontact=?, cid=? where sid=?",[sname,semail,scontact,cid,sid],(err,result)=>{
        res.redirect("/viewStudent");
    });

});
app.get("/searchStudent",(req,res)=>{
    let sname = req.query.sname;
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student s join course c on s.cid=c.cid where sname like ? OR semail like ? OR cname like ?",[`%${sname}%`,`%${sname}%`,`%${sname}%`],(err,result)=>{
        if(err){
            console.log("Some problem!!!",err);
        }
        else{
            res.json(result)
        }
    });
});

// Result module
app.get("/courseWiseStudent", (req, res) => {
    db.query("select * from course",(err,result)=>{
        if(err){
            console.log("Some problem!!!",err);
        }
        else{
            res.render("courseWiseStudent.ejs",{courses:result,
                                                data:[],
                                                 cid:""
            });
        }
    });
});
app.get("/cwstudent",(req,res)=>{
    let cid = parseInt(req.query.cid);
    if(isNaN(cid)){
        return res.redirect("/courseWiseStudent");
    }
    db.query("select * from student where cid=?",[cid],(err,studentResult)=>{
        if(err){
            console.log("Some problem!!!",err);
            res.redirect("/courseWiseStudent");
        }
        else{
            db.query("select * from course",(err2,courseResult)=>{
                if(err2){
                    console.log("Some problem!!!",err);
                    res.redirect("/courseWiseStudent");
                }
                else{
                    res.render("courseWiseStudent.ejs",{courses:courseResult,
                                                        data:studentResult,
                                                        cid: req.query.cid });
                }
            });
        }
    });
});
app.get("/countStudent", (req, res) => {
    db.query("select * from course",(err,result)=>{
        if(err){
            console.log("Some problem!!!",err);
        }
        else{
            res.render("countStudent.ejs",{courses:result,
                                                count:[] 
            });
        }
    });
});
app.get("/cstudent",(req,res)=>{
    let cid = parseInt(req.query.cid);
    if(isNaN(cid)){
        return res.redirect("/courseWiseStudent");
    }
    db.query("select count(*) AS total from student where cid=?",[cid],(err,totalResult)=>{
        if(err){
            console.log("Some problem!!!",err);
            res.redirect("/countStudent");
        }
        else{
            db.query("SELECT * FROM course", (err2, courseResult) => {
                if (err2) {
                    console.log("Some problem!!!", err2);
                    return res.redirect("/countStudent");
                }
    
                res.render("countStudent.ejs", {
                    courses: courseResult,
                    count: totalResult[0].total
                });
            });
        }
    });
});

// run server on 7000 port no
app.listen(port_no, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server started on: ${port_no}`);
    }
});