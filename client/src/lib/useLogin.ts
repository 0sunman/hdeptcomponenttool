import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IS_LOGIN } from "../graphql/users";
import { graphqlFetcher } from "../lib/queryClient";
import { selectorSelector, UserLoginState } from "../recoils/pages";

const useLogin = () =>{
    const userid = window.localStorage.getItem("userid")
    const [isLogin,setIsLogin] = useState<Boolean>(false);
    const [role,setRole] = useState<String>("");
    const navigate = useNavigate();
    const {mutate:isLoginConfirm} = useMutation(({userid,token}:any)=>graphqlFetcher(IS_LOGIN,{
        userid, token
    }),{onSuccess:({isLogin})=>{
        const {isLogin:isLoggedIn, role} = isLogin;
        setIsLogin(isLoggedIn);
        setRole(role);
        if(!isLoggedIn){
            window.localStorage.removeItem("userid");
            window.localStorage.removeItem("token");
        }
    },onError:(err)=>{
        setIsLogin(false);
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("token");
        console.error(err);
    }}) 

    useEffect(()=>{
        const userid = window.localStorage.getItem("userid");
        const token = window.localStorage.getItem("token");
        if(userid === null || token === null){ 
            setIsLogin(false);
            navigate("/")
        }else{

            isLoginConfirm({userid : ((userid) ? userid:""),token:((token)?token:"")});
        }
    },[])

    return [isLogin, role];
}
export default useLogin;