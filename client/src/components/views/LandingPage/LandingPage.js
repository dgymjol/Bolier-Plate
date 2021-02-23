import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        // get request를 서버로 보내는데, endpoint는 /api/hello
        axios.get('/api/hello').then(response => console.log(response)) // 요청 후 서버에서 돌아온 response는 console 창에
    }, [])

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height : '100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
