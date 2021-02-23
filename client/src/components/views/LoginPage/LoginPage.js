import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); // 버튼 눌렀을 때 리프레시 방지
        
        // state에 이메일과 비밀번호가 잘 담겨있음
        // console.log('Email : ', Email);
        // console.log('Password : ', Password);

        //서버(/server/index.js)에다가 이 값들을 보내기
        let body = {
            email : Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/'); // 로그인 성공 시 메인홈('/') 이동
            }
            else{
                alert('Failed to login');
            }
        })

    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height : '100vh'
        }}>

            <form style ={{display: 'flex', flexDirection: 'column' }}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange = {onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange= {onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>


            </form>


        </div>
    )
}

export default withRouter(LoginPage)
