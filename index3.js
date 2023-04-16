const express = require("express");
const app = express();

const mongoose = require("mongoose");
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({
    message: "get request working!!",
  });
});

// this line suiggest only connecting to db;
mongoose
  .connect("mongodb://127.0.0.1:27017/batch8Db")
  .then(() => console.log("Connected to batch8db!"));

//in order to view this db , we have specify what kind of database it is , and what is the type of data it is going to store
//Schema of the db model;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("UserDatabase", UserSchema);
// this model will be used to intercat with our db using our apis.

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  let userobj = {
    username: username,
    password: password,
    email: email,
  };

  // res.json({
  //     message:"data recieved"
  // })

  //method to save the data in mongodb
//   try {
//     let data = await UserModel(userobj).save();
//     if (data) {
//       return res.json({
//         message: "data inserted sucessfully",
//       });
//     }
//     return res.json({
//       message: "data not inserted",
//     });
//   } catch (error) {
//     return res.json({
//       message: "some error",
//     });
//   }

try {
    const data = await UserModel.find({ email });
    if (data.length !==0) {
        return res.json({
            message:"data exists"
        })
    }else{
        try {
            let data = await UserModel(userobj).save();

            if (data) {
              return res.json({
                message: "user added to the collection",
              });
            }
            // return res.json({
            //   message: "data not inserted",
            // });
          } catch (error) {
            return res.json({
              message: "some error",
            });
          }
    }
    // return res.json({
    //     message:"data does not exists"
    // })
} catch (error) {
    return res.json({
     message:"error in finding the data"
 })
}

 
});


// error:multiple responses : req header cannot set after has been sent

app.post("/user", async(req, res) => {
    const { email } = req.body;
    // to find data based on email address provided';

   try {
       const data = await UserModel.find({ email });
       if (data.length !==0) {
           return res.json({
               message:"data exists"
           })
       }
       return res.json({
           message:"data does not exists"
       })
   } catch (error) {
       return res.json({
        message:"error in finding the data"
    })
   }
})


app.listen(5200, () => {
  console.log("server running");
});
