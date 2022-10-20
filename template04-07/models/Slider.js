const  mongoose  = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join('/uploads/slider/avatars');

const sliderschema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    message : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
});

let storage  = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname))
    }
});

sliderschema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
sliderschema.statics.avatarpath = AVATAR_PATH;

const Slider = mongoose.model('Slider',sliderschema);

module.exports = Slider;

