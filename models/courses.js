const Mongoose = require("mongoose");
const SchemaCourses = new Mongoose.Schema({
    "titleCourse":{
        type:String,
    },
    "titleImage":{
        type:String
    },
    "lectures":{
        type:Array
    }
});
const ModelCourses = Mongoose.model("courses",SchemaCourses);
module.exports = ModelCourses;