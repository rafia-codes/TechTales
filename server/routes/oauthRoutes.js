const express=require('express');
const router=express.Router();
const passport=require('passport');
const oauthController=require('../controller/oauthController');

router.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/facebook',passport.authenticate('facebook', { scope: ['public_profile','email'] }));
router.get('/github',passport.authenticate('github', { scope: ['user:email'] }));
router.get('/discord',passport.authenticate('discord', { scope: ['identify','email'] }));

router.get('/google/callback',passport.authenticate('google', { session: false }),(req,res)=>oauthController.oauthsuccess(req,res));
router.get('/facebook/callback',passport.authenticate('facebook', { session: false }),(req,res)=>oauthController.oauthsuccess(req,res));
router.get('/github/callback',passport.authenticate('github', { session: false }),(req,res)=>oauthController.oauthsuccess(req,res));
router.get('/discord/callback',passport.authenticate('discord', { session: false }),(req,res)=>oauthController.oauthsuccess(req,res));

module.exports=router;