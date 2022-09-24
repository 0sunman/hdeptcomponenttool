import { useEffect } from "react";
import { useRecoilState } from "recoil";
import WriteContainer from "../container/WriteContainer";
import useLogin from "../lib/useLogin";
import { UserLoginState, UserRuleState } from "../recoils/pages";


const writePage = () =>{
    const [isLoginState, role] = useLogin();
    const [isLogin, setIsLogin] = useRecoilState(UserLoginState);
    const [rule, setRule] = useRecoilState(UserRuleState);
    useEffect(()=>{
//        writePage;
        setIsLogin(isLoginState);
    },[isLoginState]);
    useEffect(()=>{
        setRule(rule);
    },[role]);
    
    return <WriteContainer></WriteContainer>
}

export default writePage;
