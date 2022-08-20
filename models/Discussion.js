const Mongoose = require("mongoose");
const SchemaDiscussion = new Mongoose.Schema({
    "email":{
        type:String,
    },
    "description":{
        type:String
    },
});
const ModelDiscussions = Mongoose.model("Discussions",SchemaDiscussion);
module.exports = ModelDiscussions;