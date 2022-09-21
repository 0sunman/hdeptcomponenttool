import { useEffect } from "react";
import { useRecoilState } from "recoil";
import WriteContainer from "../container/WriteContainer";
import useLogin from "../lib/useLogin";
import { UserLoginState } from "../recoils/pages";


const writePage = () =>{
    const [isLoginState] = useLogin();
    const [isLogin, setIsLogin] = useRecoilState(UserLoginState);
    useEffect(()=>{
        setIsLogin(isLoginState);
    },[isLoginState]);
    
    return <WriteContainer></WriteContainer>
}

export default writePage;
