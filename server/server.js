require('dotenv').config();
require('./config/passport');

const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const blogRouter=require('./routes/blogroutes');
const authRouter=require('./routes/authRoutes');
const oauthRouter=require('./routes/oauthRoutes');
const profileRouter=require('./routes/profileRoutes');
const connectdb=require('./config/db');
const passport=require('passport');

const app=express();

connectdb().then(()=>console.log(`connected to DB`));

app.use(cors({
    origin:"https://techtalesapp.netlify.app",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/blogs",blogRouter);
app.use("/auth",authRouter);
app.use("/oauth",oauthRouter);
app.use("/profile",profileRouter);

app.listen(3200,()=>{
    console.log("Port running");
})