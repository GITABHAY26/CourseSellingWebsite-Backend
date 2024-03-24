const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://abhy:NjvbdUT45XODDWDa@cluster0.hiczyck.mongodb.net/Course_Purchase_appJWT');


const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Course'

    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}