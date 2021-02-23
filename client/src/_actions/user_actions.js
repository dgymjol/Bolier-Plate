import axios from 'axios';
import {
    LOGIN_USER
}from './types';

export function loginUser(dataToSubmit){


    // 이전 state + action 을 통해 next state를 reducer로 리턴

    // nest state
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response =>response.data)

    // 리턴하기
    return{ 
        type : LOGIN_USER,
        payload : request
    }

}