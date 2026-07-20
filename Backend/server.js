const mongoose = require("mongoose");
require('dotenv').config();
const express =require("express");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then( ()=>{
    console.log('connected to MongoDB');
app.listen(process.env.PORT || 5000 ,()=> {
    console.log(`Server running on PORT ${process.env.PORT || 5000}`);
})
}
)
.catch( (error)=>{
    console.log('Error to Connected to Mongoos',error);
}
);


//Routes
app.use("/api/users",require("./Routers/UserRouter"));