import React from "react";
import {Grid, Button, Container, Typography, TextField} from "@mui/material";

import { API_BASE_URL } from "../config/app-config";

const Login = () => {

    // 로그인 서브밋 이벤트 핸들러
    const submitHandler = e => {

        // html태그가 가진 기본 기능 없애기
        e.preventDefault();

        // 1. 이메일 입력란, 패스워드 입력란에 있는 데이터를 얻어온다.

        // 아이디 입력값
        const $loginId = document.getElementById('loginId');
        // console.log($email.value);

        // 패스워드 입력값
        const $password = document.getElementById('password');
        // console.log($password.value);

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                loginId : $loginId.value,
                password: $password.value
            })
        })
        .then(res => {
            // console.log('res code:', res.status);
            return res.json();
        })
        .then(loginUserData => {
            // console.log(loginUserData);
            if (loginUserData.message) {
                // console.log('로그인 실패');
                alert(loginUserData.message);
            } else {
                // console.log('로그인 성공');

                // 로그인 성공 시 받은 토큰을 로컬 스토리지에 저장
                // 로컬 스토리지에 저장해야 하드디스크에 남음. 세션 스토리지는 세션 안에 저장하는 것.
                localStorage.setItem('ACCESS_TOKEN', loginUserData.token);
                localStorage.setItem('LOGIN_NICKNAME', loginUserData.nickName);

                // 게시물 목록 보여주기
                window.location.href = '/';
            }
        })
        // 서버가 200번이아닌 오류코드를 보낼경우 실행할 코드
        .catch(err => {
            console.log('err:', err.message);
        })
    };


    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                
                </Grid>
            </Grid>
            <form noValidate onSubmit={submitHandler}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="loginId"
                            label="enter your id"
                            name="loginId"
                            autoComplete="loginId"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;