import React from "react";
import { Suspense, SyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Alert from "../components/Popup/alert";
import { REMOVE_CONTENT, ADD_CONTENTS } from "../graphql/contents";
import { IS_LOGIN, LOGIN_USER, LOGOUT_USER } from "../graphql/users";
import { graphqlFetcher } from "../lib/queryClient";
import { CurrentPageSelector, IdSelector, writeSelector, alertSelector, alertTextSelector,UserLoginState } from "../recoils/pages";
import arrToObj from "../util/arrToObj";

const Main = styled.div`
    position:absolute; width:100%;
    height:calc(100% - 40px);
    display:block; overflow:scroll
`

const Header = styled.div`
    width:100%;
    display:div; 
    height:40px; 
    line-height:40px;
    border:0;
    padding:0px;
    text-align:center;
`
const Menu = styled.div`
    display:flex; 
    height:40px; 
    flex-direction:row;
    justify-content:center;
    color:white;
    background-color:#45675b;
    & .back{position:absolute; top: 7px; left: 5px;margin-left:10px; color:white; border:0; background-color:#45675b}
    & .sub{position:absolute; right:7px; color:white;}
    & .sub > button{margin-right:10px; border:0; background-color:#45675b; color:white;}
`
const Title = styled.span``

const onChange = (e:SyntheticEvent)=>{
    const inputData = (e.target) as HTMLInputElement;
}


const GlobalLayout = ()=>{
    const location = useLocation();
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    const id = useRecoilValue(IdSelector);
    const [currentPage, setCurrentPage] = useRecoilState(CurrentPageSelector);
    const [page, setPage] =useRecoilState(writeSelector);
    const {title,content,path,selector} = page;
    const userid = window.localStorage.getItem("userid");
    const navigate = useNavigate();

    const {mutate:logout} = useMutation(()=>graphqlFetcher(LOGOUT_USER,{
        userid
    }),{onSuccess:()=>{
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("token");
        setIsLogin(false);
    },onError:(err)=>{
    }}) 
    
    useEffect(()=>{
        setCurrentPage(location.pathname);
    },[location])
    return (
    <div>
        <Header>
            <Menu>
                <Title>THE HYUNDAI - 해외브랜드 컴포넌트 편집기 
                    {(currentPage.indexOf("/write") > -1) && " - 글쓰기 모드"}
                    {(currentPage.indexOf("/detail") > -1) && " - 편집 모드"}
                
                </Title>
                {(currentPage !== "/") && <button onClick={() => navigate(-1)} className="back material-symbols-outlined">arrow_back_ios</button>}
                    {(currentPage.indexOf("/write") === -1 && currentPage.indexOf("/detail") === -1) && 
                        <div className="sub">
                        <button onClick={() => {navigate("/write")}}>컴포넌트 생성</button> 
                        <button onClick={()=>logout()}>로그아웃</button></div>
                    }
                    {(currentPage.indexOf("/detail") > -1) && (
                        <div className="sub">
                            <Link to='/' style={{color:"white"}}>목록으로</Link>
                        </div>
                    )}
            </Menu>
        </Header>
        <Main>
            <Suspense fallback={<Alert/>}>
                <Outlet/>
                <Alert/>
            </Suspense>
        </Main>
    </div>
    
    )
}
export default React.memo(GlobalLayout);