import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null){
    
    //null : 아무나 출입 가능
    //true : 로그인 유저만 가능
    //false: 로그인한 유저는 출입 물자능한 웹
    function AuthenticationCheck(props){
        
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response=>{
                console.log(response);

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){ // true인 곳(로그인 필요한 페이지)으로 가려하면
                        props.history.push('/login'); // 로그인 페이지로 가게 하기
                    }
                }
                else{ // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //isAdmin이 false인데, 관리자만 들어갈 수 있는 페이지 가려하면
                        props.history.push('/');
                    }else{
                        // option이 false인 곳(회원가입 등 로그인 유저가 출입 불가능) 가려하면
                        if(option === false){
                            props.history.push('/');
                        }
                    }


                }
            })
        }, [])

        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}