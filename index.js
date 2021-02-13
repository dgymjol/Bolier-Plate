const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const {User} = require("./models/User");

// application/x-www-form-urlencoded 의 형태를 분석해서 가져올 수 있게 함
app.use(bodyParser.urlencoded({extended: true}));

// application/json 의 형태를 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

const config = require('./config/key');

const mongoose = require('mongoose')
mongoose.connect('config.mongoURI', {
    useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!!!! 새해 복 많이!!')
})

// post이고 end-point가 /register
app.post('/register', (req, res)=>{
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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})