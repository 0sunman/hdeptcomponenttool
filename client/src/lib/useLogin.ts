import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IS_LOGIN } from "../graphql/users";
import { graphqlFetcher } from "../lib/queryClient";
import { UserLoginState } from "../recoils/pages";

const useLogin = () =>{
    
    const [isLogin,setIsLogin] = useState<Boolean>(false);
    const navigate = useNavigate();
    const {mutate:isLoginConfirm} = useMutation(({userid,token}:any)=>graphqlFetcher(IS_LOGIN,{
        userid, token
    }),{onSuccess:({isLogin})=>{
        const {userid, isLogin:isLoggedIn} = isLogin;
        setIsLogin(isLoggedIn);
        if(!isLoggedIn){
            window.localStorage.removeItem("userid");
            window.localStorage.removeItem("token");
        }
    },onError:(err)=>{
        console.error(err);
    }}) 

    useEffect(()=>{
        const userid = window.localStorage.getItem("userid");
        const token = window.localStorage.getItem("token");
        if(userid === null || token === null){ 
            setIsLogin(false);
            navigate("/")
        }else{
            isLoginConfirm({userid,token});
        }
    },[])

    return [isLogin];
}
export default useLogin;