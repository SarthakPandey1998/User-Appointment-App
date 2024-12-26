const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();
app.use(cors({
    origin:"*",
    method:["GET","POST"]
}))

const constr = "mongodb://127.0.0.1:27017";
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//API Routes
app.get("/users",(req,res)=>{
    mongoClient.connect(constr).then(clientObj=>{
        const db = clientObj.db("todo-app");
        db.collection("tblusers").find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})


app.post("/register-user",(req,res)=>{

    const user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };
    mongoClient.connect(constr).then((clientObj)=>{
       const db = clientObj.db("todo-app");
       db.collection("tblusers").insertOne(user).then(()=>{
        console.log("User Registered successfully");
        res.end();
       })
    })
})

app.get("/appointment/:userid",(req,res)=>{
    mongoClient.connect(constr).then(clientObj=>{
        const db = clientObj.db("todo-app");
        db.collection("tblappointments").find({UserId:parseInt(req.params.userid)}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})

app.get("/get-appointment/:id",(req,res)=>{
    mongoClient.connect(constr).then(clientObj=>{
        const db = clientObj.db("todo-app");
        db.collection("tblappointments").find({AppointmentId:parseInt(req.params.id)}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    })
})

app.post("/add-appointment",(req,res)=>{

    var appointment = {
        AppointmentId: parseInt(req.body.AppointmentId),
        Title:req.body.Title,
        Description:req.body.Description,
        Date:new Date(req.body.Date),
        UserId: req.body.UserId
    };

    mongoClient.connect(constr).then(clientObj=>{
        const db = clientObj.db("todo-app");
        db.collection("tblappointments").insertOne(appointment).then(()=>{
            console.log("Appointment added successfully");
            res.end();
        })
    })
})


    app.put("/edit-appointment/:id",(req,res)=>{
        mongoClient.connect(constr).then(clientObj=>{
            const db = clientObj.db("todo-app");
            db.collection("tblappointments").updateOne({AppointmentId:parseInt(req.params.id)},{$set:{AppointmentId:parseInt(req.body.AppointmentId),Title:req.body.Title,Description:req.body.Description,Date:req.body.Date,UserId:req.body.UserId}}).then(()=>{
                console.log("Appointment updated successfully");
                res.end();
            })
        })
    })

    app.delete("/delete-appointment/:id",(req,res)=>{
        mongoClient.connect(constr).then((clientObj)=>{
            const db = clientObj.db("todo-app");
            db.collection("tblappointments").deleteOne({AppointmentId:parseInt(req.params.id)}).then(()=>{
                console.log("Appointment deleted successfully");
                res.end();
                
            })
        })
    })






app.listen(4000,()=>{
    console.log("Server Started http://127.0.0.1:4000");
})