const express = require("express");
const app = express();


const mongoose = require("mongoose");

app.get("/test", (req, res) => {
    res.json({
        message:"get request is working"
    })

})

// this line suggest only connecting DB

// app.post("/product", function (req, res){
//     const course={};
//     course.id=req.body.id;
//     course.name=req.body.name;
//     course.category=req.body.category;
//     course.price=req.body.price;
//     courses.push(course);
//     res.send(product);

// })

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')
  .then(() => console.log('Connected!'));

  // in order ot view DB we have to specify what kind of data it is
  // schema of the DB model 

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username :{
        type: string,
        required: true
    },
    email :{
        type: string,
        required: true
    },
    password :{
        type: string,
        required: true
    }
  });

  const userModel = mongoose.model('user database', mySchema);
  // this model will be used to  interact with our DB using our apis.





app.listen(5000, ()=>{
    console.log("server running")
})