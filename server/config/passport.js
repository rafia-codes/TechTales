const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User=require('../models/user');
const { generateusername }=require('../utils/generate');

async function findOrCreateUser(profile,provider){
    const email=profile.emails?.[0].value;
    const profilepic=profile.photos?.[0]?.value || "";
    let user=await User.findOne({email});
    if(!user){
        user=await User.create({
            email,
            profilepic,
            username:await generateusername(email.split('@')[0]),
            displayName: profile.displayName || profile.username,
            authProvider:provider,
            isEmailVerified:true,
            password: null,
        });
    }
    return user;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3200/oauth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
    const user=await findOrCreateUser(profile,"google");
    return cb(null,user);
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3200/oauth/google/callback",
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
},
async function(accessToken, refreshToken, profile, cb) {
    const user=await findOrCreateUser(profile,"facebook");
    return cb(null,user);
  })
);

passport.use(new DiscordStrategy({
    clientID: process.env.Discord_APP_ID,
    clientSecret: process.env.Discord_SECRET,
    callbackURL: "http://localhost:3200/oauth/discord/callback",
    scope: ['identify', 'email'],
},
async function(accessToken, refreshToken, profile, cb) {
    const user=await findOrCreateUser(profile,"discord");
    return cb(null,user);
  })
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3200/oauth/github/callback"
},
async function(accessToken, refreshToken, profile, cb) {
    const user=await findOrCreateUser(profile,"github");
    return cb(null,user);
  })
);