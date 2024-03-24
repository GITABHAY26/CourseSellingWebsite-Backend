const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const router = Router();
const {Admin , User, Course} = require("../db");
const {JWT_SECRET} = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   Admin.create({
    username,
    password
   });

   res.json({msg: 'Admin created successfully' });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({username}, JWT_SECRET);
        res.json( {token});
    }else{res.json( {msg:"Admin does not exist"});}
});

router.post('/courses', adminMiddleware, async (req, res) => {
   
    const title = req.body.title;
    const  description = req.body.description;
     const price = req.body.price;
     const imageLink = req.body.imageLink;
 
    const NewCourse = await Course.create(
       { title,
         description,
         price,
         imageLink }
     )
 
     res.json({
         msg:"Course sucessfully created" , 
         id: NewCourse._id
     })
 

});

router.get('/courses', adminMiddleware, async (req, res) => {
     
  const response = await Course.find({}) ;

  res.json({course: response});

});

module.exports = router;