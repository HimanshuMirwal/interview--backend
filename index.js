const express = require("express");
const cors= require("cors");
const bodyParser = require("body-parser")
const app = express()
require('dotenv').config();

const mongoose = require("mongoose");
const Courses = require("./models/courses")
const ModelDiscussions = require("./models/Discussion")
const ModelUser =  require("./models/user")
mongoose.connect("mongodb+srv://admin-himanshu:test123@cluster0.qewzz.mongodb.net/Practice?retryWrites=true&w=majority")
.then(()=>{
    console.log("database connected")
}).catch(Err=>console.log("Error", Err))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    // const data = new Courses({
    //     "titleCourse":"Introduction to Artificial Intelligence",
    //     "lectures":[{
    //         "lectureTitle":"Introduction to Artificial Intelligence",
    //         "videoUrls":[{
    //             "name":"What is machine learning",
    //             "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //         }]},
    //         {
    //             "lectureTitle":"Concept of Artificial Intelligence",
    //             "videoUrls":[{
    //               "name":"Rent cost of flat in AI", 
    //               "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             },{
    //                 "name":"Linear regression in AI", 
    //                 "videoUrl":"https://www.youtube.com/embed/Y4qO9unerGs"
    //               },{
    //                 "name":"polymer regression in AI", 
    //                 "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             }]
    //         },
    //         {
    //             "lectureTitle":"Application of Artificial Intelligence",
    //             "videoUrls":[{
    //               "name":"Email spam filter in AI", 
    //               "videoUrl":"https://www.youtube.com/embed/Y4qO9unerGs"
    //             },{
    //                 "name":"Recommendation of App in AI", 
    //                 "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             }]
    //         },
    //         {
    //             "lectureTitle":"Neural network and deep learning",
    //             "videoUrls":[{
    //               "name":"Application of ML in college Admission", 
    //               "videoUrl":"https://www.youtube.com/embed/Y4qO9unerGs"
    //             },{
    //                 "name":"Application of ML in college Admission 2",  
    //                 "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             },{
    //                 "name":"Neural Network", 
    //                 "videoUrl":"https://www.youtube.com/embed/Y4qO9unerGs"
    //               },{
    //                 "name":"recognizing handwriting digit",
    //                 "videoUrl":"https://www.youtube.com/embed/Y4qO9unerGs"
    //               },{
    //                 "name":"recognizing handwriting digit 2",
    //                 "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             }]
    //         },{
    //             "lectureTitle":"Application of deep learning",
    //             "videoUrls":[{
    //                 "name":"Application of deep learning",
    //                 "videoUrl":"https://www.youtube.com/embed/PTlNfIaSGus"
    //             }]
    //         }
    //         ]
    // })
    // data.save()
    res.send("<h1>Interview Task App.</h1>")
})
app.post("/post-descussion",(req, res)=>{
    const email = req.body.email;
    const description = req.body.description;
    const data = new ModelDiscussions({
        email:email,
        description:description,
    });
    data.save()
    .then(data=>{
        res.json(data)
    }).catch(Err=>res.send(Err))
})
app.get("/descussion",(req, res)=>{
    ModelDiscussions.find()
    .then(data=>{
        res.json(data)
    }).catch(Err=>res.send(Err))
})
app.get("/courses",(req, res)=>{
    Courses.find()
    .then(data=>{
        res.json(data)
    }).catch(Err=>res.send(Err))
})
app.get("/coursesbyid:id",(req, res)=>{
    const id = req.params.id;
    Courses.find({_id:id})
    .then(data=>{
        res.json(data)
    }).catch(Err=>res.send(Err))
})

app.post("/signup-user",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = new ModelUser({
        name:name,
        email:email,
        password:password,
    });
    data.save()
    .then(data=>{
        console.log(data)
        res.json(data)
    }).catch(Err=>{
        console.log(Err)
        res.send(Err)
    })
})
app.post("/signin-user",(req,res)=>{
    ModelUser.find({email:req.body.email, password:req.body.password})
    .then(data=>{
        if(data.length > 0 ){
            res.json({code:200,message:"Greetings of the day!",name:data[0].name})
        }else{
            res.json({code:500, message:"please create account first"})
        }
    })
    .catch(Err=>{
        res.json({code:501,message:"Error"+Err})
        console.log(Err)
    })
})


app.listen(process.env.PORT ||5000,()=>{
    console.log("server on 5000")
})