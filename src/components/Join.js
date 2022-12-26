import React, { useState } from "react";
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";

import { API_BASE_URL } from "../config/app-config";
import { json } from "react-router-dom";

const Join = () => {

    // 회원 입력 정보 상태관리
    const [user, setUser] = useState({
        loginId: '',    // 중복 불가능
        nickName: '',   // 중복 불가능
        email: '',      // 중복 불가능
        password: ''
    });

    // 검증 메시지 상태관리
    const [msg, setMsg] = useState({
        loginId: '',
        nickName: '',
        email: '',
        password: ''
    });

    // 검증 완료 여부 상태관리
    const [validate, setValidate] = useState({
        loginId: false,
        nickName: false,
        email: false,
        password: false
    });

     // loginId을 입력처리 하는 이벤트 핸들러
     const loginIdHandler = e => {
        // console.log(e.target.value);

        const loginIdRegex = /^[가-힣]{2,8}$/;    // 2~8 글자. 한글로만

        // loginId 가 정확히 쓰여진 loginId인가? - 검증 로직
        let message;    // 입력 상황 메시지
        if (!e.target.value) {  // loginId 를 안 적음.
            message = '아이디는 필수값입니다.';
            setValidate({...validate, loginId: false})
        } else if (!loginIdRegex.test(e.target.value)) {  // 이름은 2~8글자 사이 한글로만. 처음엔 '정규표현식'을 검색해서 사용할 것
                    // 값이 이 정규표현식과 일치하는지 test.
            message = '2~8글자 사이의 한글로 입력해주세요.';
            setValidate({...validate, loginId: false})

        } else {
            message = '사용 가능한 아이디입니다.';
            setValidate({...validate, loginId: true})
        }

        // console.log(message);
        setMsg({...msg, loginId: message}) 
        
        setUser({ ...user, loginId: e.target.value })
    };


    // 닉네임을 입력처리 하는 이벤트 핸들러
    const nickNameHandler = e => {
        // console.log(e.target.value);

        const nickNameRegex = /^[가-힣]{2,8}$/;    // 2~8 글자. 한글로만

        // 닉네임이 정확히 쓰여진 닉네임인가? - 검증 로직
        let message;    // 입력 상황 메시지
        if (!e.target.value) {  // nickName 을 안 적음.
            message = '닉네임은 필수값입니다.';
            setValidate({...validate, nickName: false})
        } else if (!nickNameRegex.test(e.target.value)) {  // 이름은 2~8글자 사이 한글로만. 처음엔 '정규표현식'을 검색해서 사용할 것
                    // 값이 이 정규표현식과 일치하는지 test.
            message = '2~8글자 사이의 한글로 입력해주세요.';
            setValidate({...validate, nickName: false})

        } else {
            message = '사용 가능한 이름입니다.';
            setValidate({...validate, nickName: true})
        }

        // console.log(message);
        setMsg({...msg, nickName: message}) 
        
        setUser({ ...user, nickName: e.target.value })
    };


    // 패스워드 입력값 검증
    const passwordHandler = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidate({...validate, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자를 포함해주세요!';
            setValidate({...validate, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidate({...validate, password: true});
        }
        setMsg({...msg, password: message});

        setUser({...user, password: e.target.value})

    };

    // 아이디 중복확인 서버통신
    const checkLoginId = (loginId) => {
        console.log('checkLoginId!!');
        fetch(`${API_BASE_URL}/auth/checkid?loginId=${loginId}`)
            .then(res => res.json())
            .then(flag => {
                let message;
                if (flag) {
                    message = '중복된 이메일입니다.';
                    setValidate({...validate, loginId: false});
                } else {
                    message = '사용가능한 이메일입니다.';
                    setValidate({...validate, loginId: true});
                }
                setMsg({...msg, loginId: message});
            });
    };

    // 닉네임 중복확인 서버통신
    const checkNickName = (nickName) => {
        console.log('checkNickName!!');
        fetch(`${API_BASE_URL}/auth/checknickname?nickName=${nickName}`)
            .then(res => res.json())
            .then(flag => {
                let message;
                if (flag) {
                    message = '중복된 이메일입니다.';
                    setValidate({...validate, nickName: false});
                } else {
                    message = '사용가능한 이메일입니다.';
                    setValidate({...validate, nickName: true});
                }
                setMsg({...msg, nickName: message});
            });
    };


    // 이메일 중복확인 서버통신
    const checkEmail = (email) => {
        console.log('checkemal!!');
        fetch(`${API_BASE_URL}/auth/checkemail?email=${email}`)
            .then(res => res.json())
            .then(flag => {
                let message;
                if (flag) {
                    message = '중복된 이메일입니다.';
                    setValidate({...validate, email: false});
                } else {
                    message = '사용가능한 이메일입니다.';
                    setValidate({...validate, email: true});
                }
                setMsg({...msg, email: message});
            });
    };

    // 이메일 입력 검증
    const emailHandler = (e) => {
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        let message;
        if (!e.target.value) {
            message = '이메일은 필수값입니다!';
            setValidate({...validate, email: false});
        } else if (!emailRegex.test(e.target.value)) {
            message = '이메일 형식이 아닙니다!';
            setValidate({...validate, email: false});
        } else {
            checkEmail(e.target.value);
        }
        setMsg({...msg, email: message});
        setUser({...user, email: e.target.value})
    };

    // 상태변수 validate 내부값이 모두 true인지 확인
    const isValid = () => {
        for (let key in validate) {
            if (!validate[key]) return false;
        }
        return true;
    };


    // 회원가입 처리 이벤트
    const joinHandler = e => {

        e.preventDefault();

        // 회원입력정보를 모두 읽어서 서버에 요청

        if(isValid()) { // validate값이 모두 true일 경우
            fetch(API_BASE_URL+'/auth/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }).then(res => {
                if (res.status === 200) {
                    alert('회원가입을 축하합니다!!');
                    window.location.href='/login';
                } else {
                    alert('서버에 문제가 생겼습니다. 다시 시도해주세요.');
                }
            })
        } else {
            alert('입력란을 다시 확인하세요!');
        }
    };


    return (

        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={joinHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="loginId"
                            variant="outlined"
                            required
                            fullWidth
                            id="loginId"
                            label="아이디"
                            autoFocus
                            onChange={loginIdHandler}
                        />
                        <span style={validate.loginId ? {color:'green'} : {color:'red'}}>{msg.loginId}</span>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="nickName"
                            variant="outlined"
                            required
                            fullWidth
                            id="nickName"
                            label="닉네임"
                            autoFocus
                            onChange={nickNameHandler}
                        />
                        <span style={validate.nickName ? {color:'green'} : {color:'red'}}>{msg.nickName}</span>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            onChange={emailHandler}
                        />
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordHandler}
                            
                        />
                        <span style={validate.password ? {color:'green'} : {color:'red'}}>{msg.password}</span>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Join;