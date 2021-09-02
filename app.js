const express= require("express");
const app=express();
const mongoose=require("mongoose");
const ejs = require('ejs');
const path= require("path");
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User = require('./models/user');
const {isLoggedIn}=require('./middleware');
const flash=require('connect-flash');
// require('dotenv').config();

mongoose.connect(
    // mongodb.connect(env.process.MONGODB_URL)
   'mongodb://localhost:27017/twitter-clone',
    {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views" ,path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname, '/public')));

//middleware function that helps in parsing the data of the body especially of the forms we don't need body parser for that
app.use(express.urlencoded ({extended: true}));

//To parse the json data that we send through axios to the backend
app.use(express.json);

//routes
const authRoutes=require('./routes/authRoute');


//APIs

const postsApiRoute=require('./routes/api/posts');

//Works for each and every incoming requests
app.use(session({
    secret: 'Anything will do',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:true}
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Specifying the strategy we will be using with passport

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//using routes
app.use(authRoutes);

//USING APIs

app.use(postsApiRoute);

app.get("/",isLoggedIn,(req,res)=>{

    res.render('/views/layouts/main-layout.ejs');
   
});


app.listen("3000",()=>{
    console.log("Server is running on port 3000")}
);