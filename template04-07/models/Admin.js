const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join('/uploads/admins/avatars');
process.env.TZ = "Asia/Calcutta";
var timezone = new Date().toString();
const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required: true
    },
    hobby : {
        type : Array,
        required: true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
},

);

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
});

AdminSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
AdminSchema.statics.avatarPath = AVATAR_PATH;



const Admin  = mongoose.model('Admin',AdminSchema);

module.exports = Admin;