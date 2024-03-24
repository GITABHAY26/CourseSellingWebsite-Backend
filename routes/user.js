const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const { User, Course} = require("../db");
const {JWT_SECRET} = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
 
    User.create({
     username,
     password
    });
 
    res.json({msg: 'User created successfully' });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({username}, JWT_SECRET);
        res.json( {token});
    }else{res.json( {msg:"user does not exist"});}
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find({});
   res.json({
    course : courses
   })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try{
        const courseId = req.params.courseId;
        const username = req.username;
    
        
        await User.updateOne({username:username},
        {
           '$push' : {purchasedCourses: courseId}
        }) 
       
       } catch(error){
        console.error(error);
       }
    
        res.json({msg: "Course purchased successfully"});
    });
    

        
       


router.get('/purchasedCourses', userMiddleware, async  (req, res) => {
    const user = await User.findOne({username : req.username});
    
     
    const course = await Course.find({ _id:{ "$in": user.purchasedCourses}} );

    res.json({ success: course });
});

module.exports = router