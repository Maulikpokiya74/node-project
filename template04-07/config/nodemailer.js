const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service : 'google',
    host : 'smtp.zoho.in',
    port : 465,
    secure : "SSL",
    auth : {
        user : "udemo1100@zohomail.in",
        pass : "Him!@#22"
    }
});


let renderTemplte = function(data,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("template not load"); return false; }

            mailHTML = template
        }

    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplte : renderTemplte
}