const express = require('express');

const passport = require('passport');

const routes = express.Router();

const adminController = require('../controllers/AdminController');

const Slidercontroller = require('../controllers/Slidercontroller');

routes.get('/', adminController.login);

routes.get('/dashboard',passport.checkAuthentication ,adminController.dashboard);

routes.get('/AddRecord',passport.checkAuthentication , adminController.AddRecord);

routes.get('/ViewRecord', passport.checkAuthentication ,adminController.ViewRecord);

routes.post('/insertAdminRecord', adminController.insertAdminRecord);

routes.get('/deleteAdminRecord/:id', adminController.DeleteAdminRecord);

routes.get('/updateAdminRecord/:id', adminController.updateAdminRecord);

routes.post('/editAdminRecord',adminController.editAdminRecord);

routes.post('/check_login',passport.authenticate('local',{failureRedirect : "/admin/"}),adminController.checkLogin);

routes.get('/changePassword',passport.checkAuthentication , adminController.changePassword);

routes.post('/confirmChangePass',passport.checkAuthentication , adminController.confirmChangePass);

routes.get('/logout', adminController.logout);

routes.get('/lostPassword', adminController.LostPassword);

routes.post('/ForgotPassword', adminController.ForgotPassword);

routes.get('/check_otp',adminController.checkOTP);

routes.post('/checkOTPData', adminController.checkOTPData);

routes.get('/setPassword', adminController.setPassword);

routes.post('/confirmPassData', adminController.confirmPassData);


// ------------------------------------Slider----------------------------------------------------- //

routes.get('/AddSliderRecord',Slidercontroller.AddSliderRecord);

routes.get('/ViewSliderRecord',Slidercontroller.ViewSliderRecord);

routes.post('/InsertSliderRecord',Slidercontroller.InsertSliderRecord);

routes.get('/DeleteSliderRecord/:id',Slidercontroller.DeleteSliderRecord);

module.exports = routes;