import React, { useRef, useState } from "react";
import { Suspense, SyntheticEvent, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Alert from "../components/Popup/alert";
import { REMOVE_CONTENT, ADD_CONTENTS } from "../graphql/contents";
import { ADD_USER, IS_LOGIN, LOGIN_USER, LOGOUT_USER } from "../graphql/users";
import { graphqlFetcher } from "../lib/queryClient";
import { UserLoginState, UserLoginPopupState, alertSelector, alertTextSelector, IdSelector, codeSelector, selectorSelector, pathSelector, currentTargetState, isNewDocumentState,QRPopupSelector } from "../recoils/pages";
import arrToObj from "../util/arrToObj";
import ListContainer from "../container/ListContainer";
import { ADD_DOCUMENT, MODIFY_DOCUMENT } from "../graphql/documents";



const LoginWrapper = styled.div`z-index:101; `
const LoginForm = styled.form``;


const MainPage = () => {
    const [newDocTitle, setNewDocTitle] = useState("");
    const [newDocType, setNewDocType] = useState("");
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    const [isLoginPopup,setIsLoginPopup] = useRecoilState(UserLoginPopupState);
    const [isQRPopup,setIsQRPopup] = useRecoilState(QRPopupSelector);
    const [id,  setIdState] = useRecoilState<string>(IdSelector);
    const [codeData, setCodeData] = useRecoilState<string>(codeSelector);
    const [selector, setSelector] = useRecoilState<string>(selectorSelector);
    const [isNewDocument, setIsNewDocument] = useRecoilState<boolean>(isNewDocumentState);
    const [path,setPath] = useRecoilState<string>(pathSelector);
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const [currentTarget, setCurrentTarget] = useRecoilState(currentTargetState)
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


    const {mutate:addDocument} = useMutation(({title,author,path,selector,content,imgUrl}:any)=>graphqlFetcher(ADD_DOCUMENT,{title,author,path,selector,content,imgUrl}),{
        onSuccess:({addDocument:docs})=>{
            const {
                id:docId, title,selector, 
                content, path,imgUrl,
                author
            } = docs[0]
            
            // setAlertText("작성 완료! 홈으로 돌아가겠습니다.");
            setIdState(docId);
            setPath(path);
            setCodeData(content);
            setSelector(selector);
            setCurrentTarget("document");
            navigate(`/document/${docId}`)
        },
        onError:(e)=>{
            console.error(e);
            setAlertFlag(true);
            setAlertText("에러가 발생했습니다! ㅠㅠ")
        }
    });




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
            isLoginConfirm({userid : ((userid) ? userid:""),token:((token)?token:"")});
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
            {isQRPopup && <div className="popup-bg qrpopup">
                <div className="popup">
                    <canvas id='qrcodeCanvas'></canvas>
                    <button onClick={()=>{
                        setIsQRPopup(false);
                    }}>확인</button>
                </div>
            
            </div>}
            {isNewDocument && <div className="popup-bg">
                <div className="popup new-doc">
                    <div>
                        <h2>새로운 웹 문서 만들기</h2>
                        <input placeholder=" 제목을 입력해주세요." onChange={(e)=>{
                            setNewDocTitle(e.target.value);
                        }}></input>
                        <select onChange={(e)=>{
                            setNewDocType(e.target.value);
                        }}>
                            <option value="">문서 유형을 지정하세요.</option>
                            <option value="doc">새로운 웹 문서</option>
                            <option value="cos">COS</option>
                            <option value="aos">AOS</option>
                            <option value="arket">ARKET</option>
                            <option value="thd">THE HYUNDAI</option>
                        </select>
                        <div className="button-area">
                            <button onClick={()=>{
                                const title = newDocTitle;
                                const content = "";
                                const selector = ".content-section";
                                const imgUrl = "";
                                const path = newDocType;
                                const author = window.localStorage.getItem("userid");
                                if(title === "" || path === ""){
                                    setAlertFlag(true);
                                    setAlertText("제목이랑 문서유형 써주세요 ㅠㅠ")
                                    return;
                                }
                                let modifiedPath = ""
                                switch(path){
                                    case "cos":
                                        modifiedPath = "/global/cos.html"
                                    break;
                                    case "aos":
                                        modifiedPath = "/global/aos.html"
                                    break;
                                    case "arket":
                                        modifiedPath = "/global/arket.html"
                                    break;
                                    case "thd":
                                        modifiedPath = "/global/thehyundai.html"
                                    break;
                                    case "doc":
                                        modifiedPath = "/global/general_page_1.html"
                                    break;
                                }
                                addDocument({title, content, selector, imgUrl, path:modifiedPath, author})
                                setIsNewDocument(false);
                            }}>웹문서 만들기</button>
                            <button onClick={()=>{
                                setIsNewDocument(false);
                            }}>취소하기</button>
                        </div>
                    </div>
                </div>
            </div>}
            <div>
                <button className="writeButton" style={{position:"fixed",bottom:"10px",right:"10px", zIndex:"99"}} onClick={() => {
                    setIsNewDocument(true)
                }}>
                    <span className="material-symbols-outlined">
                edit
                </span>
                </button>
            </div>
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
