const express = require('express');
const router=express.Router();
const User =require('../models/user');
const passport = require('passport');


//We'll create a signup page
router.get('/register', (req,res) => {
    res.render('auth/signup',{message:req.flash('error')});
})



//Registering the user
router.post('/register', async(req,res)=>{
    try{
   const user = {
       firstName: req.body.firstname,
       lastName: req.body.lastname,
       email: req.body.email,
       username: req.body.username
   }

  const newUser=await User.register(user, req.body.password);

  res.status(200).send(newUser);

  console.log("user is successfully registered");
}
catch(e)
{
    req.flash('error',e.message);
    res.redirect('/register');
}
});


router.get("/",(req,res)=>{
    console.log()
})

//To get the login page
router.get("/login", (req,res) =>{
    res.render('auth/login');
})


//To actually login the user
// router.post('/login', passport.authenticate('local',
//     {
//         failureRedirect: '/login',
//     }), (req, res) => {
//         res.redirect('home');
// });


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    redirectL: '/home',
}), (req, res) => {
    res.render('layouts/main-layout');
});
//logout

router.get('/logout', (req,res)=>{
req.logout();
res.redirect('/login');
})





module.exports =router;