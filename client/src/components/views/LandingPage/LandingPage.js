import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        // get request를 서버로 보내는데, endpoint는 /api/hello
        axios.get('/api/hello').then(response => console.log(response)) // 요청 후 서버에서 돌아온 response는 console 창에
    }, [])

    const onClickHandler = ()=>{
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login');
            }
            else{
                alert('failed to logout');
            }
        })
    }
    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height : '100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
