const express = require("express");
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require("./middleware/auth");
const {User} = require("./models/User");

// application/x-www-form-urlencoded 의 형태를 분석해서 가져올 수 있게 함
app.use(bodyParser.urlencoded({extended: true}));

// application/json 의 형태를 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology : true, 
    useCreateIndex: true, 
    useFindAndModify: false
})
.then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!!!! 새해 복 많이!!')
})


app.get('/api/hello', (req, res)=>{

  res.send("안녕하세요~")
})

// post이고 end-point가 /register
app.post('/api/users/register', (req, res)=>{
  //회원가입할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다

  //body parser를 이용해서 user 형식에 맞게 데이터를 가져올 수 있음
  const user = new User(req.body)

  //mongoose 의 메서드로 데이터를 저장
  user.save((err, userInfo)=>{ // 만약 에러가 있다면 클라이언트한테 json 형태로 알려줌
    if(err) return res.json({success:false, err})
    //에러없다면 성공(200) 
    return res.status(200).json({success:true})
  })

})

app.post('/api/users/login', (req, res)=>{
  //1. 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({email: req.body.email}, (err,user)=>{
    
    if(!user){//user 콜렉션 안에 이메일이 없다면(== user가 false)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //2. 요청된 이메일을 데이터베이스에서 있다면, 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.."
      })

    //3. 비밀번호까지 맞다면 토큰을 생성한다.
    user.generateToken((err, user)=>{
      if(err) return res.status(400).send(err); // 400은 에러를 뜻함

      // 토큰을 저장한다. 쿠키나, 로컬스토리지...등등에 지금은 쿠키에다가 저장하겠다
      res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess : true, userId : user._id})
    })
    })
  })
})

app.get('/api/users/auth', auth, (req,res)=>{
  // 여기까지 middleware를 통과해왔다는 얘기는 Auth(Authentication)이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname : req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res)=>{

  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user)=>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success:true
      })
    })
})

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})