const Mongoose = require("mongoose");
const SchemaUsers = new Mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        unique:true,
        required:true

    },
    "password":{
        type:String,
        required:true
    },
});
const ModelUsers = Mongoose.model("Users",SchemaUsers);
module.exports = ModelUsers;