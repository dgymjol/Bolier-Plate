const mongoose = require('mongoose');

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email:{
         type: String,
         trim : true, // 문자열 속 공백 없애주는 역할
         unique : 1 // 이메일 중복될 수 없게
    },
    password:{
        type : String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength:50
    },
    role:{ // 관리자인지 일반 유저인지
        type:Number,
        default : 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type:Number
    }
});

//Model
const User = mongoose.model('User', userSchema);

//다른 파일에서도 쓸 수 있도록
module.exports = { User }