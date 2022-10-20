const slider = require('../models/Slider');

const fs = require('fs');

const path = require('path');
const { setFlash } = require('../config/middlewareFlash');

const nodemailer = require('../config/nodemailer');
const Slider = require('../models/Slider');


module.exports.AddSliderRecord = (req,res)=>{
    return res.render('add_slider_record');
}

module.exports.ViewSliderRecord = (req,res)=>{
    Slider.find({},function(err,record){ 
        return res.render('view_slider_record',{
            sliderRecord : record
        });
    })
}

module.exports.InsertSliderRecord = (req,res)=>{
    Slider.uploadedAvatar(req,res,(err)=>{
        if(err){
            console.log('image not uploaded');
            return false;
        }
        if(req.file){
            var avatar = Slider.avatarpath+"/"+req.file.filename;
            slider.create({
                title : req.body.title,
                message : req.body.slidermessage,
                avatar : avatar
            },(err)=>{
                if(err){
                    console.log('record not inserted',err);
                    return false;
                }
                return res.redirect('back');
            })
        }
    })
}

module.exports.DeleteSliderRecord = function(req,res){
    var id = req.params.id;
    Slider.findById(id,function(err,data){
        if(err){
            console.log("something wrong");
            return false;
        }

        fs.unlinkSync(path.join(__dirname,'..',data.avatar));
        Slider.findByIdAndDelete(id,function(err,deleteRecord){
            if(err){
                console.log('record not deleted');
                return false;
            }
            req.flash('success','Record Deleted Successfully');
            return res.redirect('/admin/ViewSliderRecord');
        })
        
    })
}
