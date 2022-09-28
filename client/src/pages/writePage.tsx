import { useEffect } from "react";
import { useRecoilState } from "recoil";
import WriteContainer from "../container/WriteContainer";
import useLogin from "../lib/useLogin";
import { UserLoginState, UserRuleState } from "../recoils/pages";


const writePage = () =>{
    const [isLogin, role] = useLogin();
    const [isLoginRecoil, setIsLogin] = useRecoilState(UserLoginState);
    const [rule, setRule] = useRecoilState(UserRuleState);
    useEffect(()=>{
        setIsLogin(isLoginRecoil);
    },[isLogin]);
    useEffect(()=>{
        setRule(rule);
    },[role]);
    
    return <WriteContainer></WriteContainer>
}

export default writePage;
