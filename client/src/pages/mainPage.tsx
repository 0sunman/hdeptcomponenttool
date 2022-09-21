import React from "react";
import { Suspense, SyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Alert from "../components/Popup/alert";
import { REMOVE_CONTENT, ADD_CONTENTS } from "../graphql/contents";
import { ADD_USER, IS_LOGIN, LOGIN_USER, LOGOUT_USER } from "../graphql/users";
import { graphqlFetcher } from "../lib/queryClient";
import { UserLoginState, UserLoginPopupState, alertSelector, alertTextSelector } from "../recoils/pages";
import arrToObj from "../util/arrToObj";
import ListContainer from "../container/ListContainer";



const LoginWrapper = styled.div`z-index:101; `
const LoginForm = styled.form``;


const MainPage = () => {
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    const [isLoginPopup,setIsLoginPopup] = useRecoilState(UserLoginPopupState);

    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];

    const navigate = useNavigate();

    const {mutate:login} = useMutation(({userid,password}:any)=>graphqlFetcher(LOGIN_USER,{
        userid, password
    }),{onSuccess:({loginUser})=>{
        const {userid, token} = loginUser;
        window.localStorage.setItem("userid",userid);
        if(token){
            window.localStorage.setItem("token",token);
        }
        setAlertText("로그인 성공!");
        setIsLogin(true);
    },onError:(err)=>{
        console.error(err);
        setAlertText("로그인 실패 ㅠㅠ<br> 아이디 패스워드를 확인해주세요.");
    }}) 

    const {mutate:join} = useMutation(({userid,password}:any)=>graphqlFetcher(ADD_USER,{
        userid, password
    }),{onSuccess:({addUser})=>{
        const {id, token} = addUser;
        window.localStorage.setItem("userid",id);
        if(token){
            window.localStorage.setItem("token",token);
        }
        setAlertText("회원가입 성공!");
        setIsLoginPopup(true);
        setIsLogin(true);
    },onError:(err)=>{
        console.error(err);
        setAlertText("회원가입 실패입니다.. <br> 서버에서 뭔가 문제가 난거같군요..");
    }}) 

    const {mutate:isLoginConfirm} = useMutation(({userid,token}:any)=>graphqlFetcher(IS_LOGIN,{
        userid, token
    }),{onSuccess:({isLogin})=>{
        const {isLogin:isLoggedIn} = isLogin;
        setIsLogin(isLoggedIn);
        if(!isLoggedIn){
            window.localStorage.removeItem("userid");
            window.localStorage.removeItem("token");
        }
    },onError:(err)=>{
        console.error(err);
    }}) 

    const doLogin = (e:SyntheticEvent)=>{
        e.preventDefault();
        try{
            setAlertFlag(true);

            const formData = new FormData(e.target as HTMLFormElement);
            const {userid,password} =(arrToObj([...formData]))
            if(userid.length < 3){
                setAlertText("ID는 4자리 이상 입력하세요.")
                return false;
            }
            if(password.length < 3){
                setAlertText("패스워드는 4자리 이상 입력하세요.")       
                return false;
            }
            setAlertText("로그인 중입니다.")
            login({userid,password})    
        }catch(e){
            console.error(e)
            setAlertText("로그인 실패 - ( 폼 값을 못받아왔네요. )")
        }
    }

    const doJoin = (e:SyntheticEvent)=>{
        e.preventDefault();
        try{
            const formData = new FormData(e.target as HTMLFormElement);
            const {userid,password, passwordConfirm} =(arrToObj([...formData]))
            if(userid.length < 3){
                setAlertText("ID는 4자리 이상 입력하세요.")
                return false;
            }
            if(password !== passwordConfirm){
                setAlertText("패스워드와 패스워드 확인이 일치하지 않네요..")      
                return false;
            }
            if(password.length < 3){
                setAlertText("패스워드는 4자리 이상 입력하세요.")      
                return false;
            }
            join({userid,password})    
        }catch(e){
            console.error(e)
            setAlertText("회원가입 실패 - ( 폼 값을 못받아왔네요. )")
        }
    }

    useEffect(()=>{
        const userid = window.localStorage.getItem("userid");
        const token = window.localStorage.getItem("token");
        if(userid === null || token === null){ 
            setIsLogin(false)
        }else{
            isLoginConfirm({userid,token});
        }
    },[])
    const setLoginPage = (e:SyntheticEvent) =>{
        e.preventDefault(); 
        setIsLoginPopup(true)
    }
    const setJoinPage = (e:SyntheticEvent) =>{
        e.preventDefault(); 
        setIsLoginPopup(false)
    }
/*

*/
        return ( 
            <>
                <ListContainer></ListContainer>    
                
            {!isLogin && (<LoginWrapper className="popup-bg">
                <div className="popup login">
                    <div className="login">
                        <h2>
                            웹페이지 편집기 로그인
                        </h2>
                        <form onSubmit={isLoginPopup ? doLogin: doJoin}>
                            <div>
                                <input type="text" name="userid" placeholder="아이디"></input>
                                <input type="password" name="password" placeholder="비밀번호"></input>
                                {!isLoginPopup && <input type="password" name="passwordConfirm" placeholder="비밀번호 확인"></input>}
                            </div>
                            <div>
                                {isLoginPopup && <input type="submit" value="로그인"></input>}
                                {!isLoginPopup && <input type="submit" value="회원가입"></input>}
                            </div>
                            <div>
                                {isLoginPopup && <button onClick={setJoinPage}>회원가입</button>}
                                {!isLoginPopup && <button onClick={setLoginPage}>로그인</button>}
                                <button onClick={(e)=>{ 
                                    e.preventDefault(); 
                                    setAlertFlag(true);
                                    setAlertText("담당자한테 알려달라고 해주세요... ")
                                    return false;
                                }}>아이디 찾기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </LoginWrapper>)}
            </>
        )

}
export default MainPage;
