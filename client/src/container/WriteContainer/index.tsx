import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { ADD_CONTENTS } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { alertSelector, alertTextSelector, imgUrlSelector, writeSelector } from "../../recoils/pages";

const writeContainer = () =>{
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [path,setPath] = useState('');
    const [selector,setSelector] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [page, setPage] = useState('');
    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];

    
    const {mutate:addItem} = useMutation(()=>graphqlFetcher(ADD_CONTENTS,{title,path,selector,content,imgUrl}),{
        onSuccess:()=>{
            setAlertText("작성 완료! 홈으로 돌아가겠습니다.");
            navigate("/");
        },
        onError:(e)=>{
            setAlertText("이런.. 작성중에 에러가 났네요");
            throw new Error("이런, 에러가 나버렸네요")
        }
    });

    useEffect(()=>{
        setAlertFlag(true)
        setAlertText("글쓰기 위한 환경을 준비중입니다!");
    },[])

    const onChange = (e:SyntheticEvent) =>{
        const {name,value} = (e.target as HTMLInputElement);
        if(name == "title"){
            setTitle(value);
        }else if(name == "content"){
            setContent(value);
        }else if(name == "path"){
            setPath(value);
        }else if(name == "selector"){
            setSelector(value);
        }else if(name == "imgUrl"){
            setImgUrl(value);
        }
    }
    
    const onClick =()=>{ 
        if(title.length > 10 && content.length > 10){
            setAlertFlag(true)
            setAlertText("서버로 글을 올리고 있어요");
            //setPage({title,content,path,selector,imgUrl});
            addItem();
        }else{
            setAlertFlag(true)
            setAlertText("텍스트가 10자이상 있어야해요.");
        }
    }

    const onImageChange = ({imageUrl}:{imageUrl:string})=>{
        setImgUrl(imageUrl);
        setAlertFlag(true)
        setAlertText("이미지가 업데이트 되었습니다.");
    }


    const attr = {title,content,path,selector,onChange,onClick,onImageChange,imgUrl,mode:"gen"}

    useEffect(()=>{
        setAlertFlag(true);
        setAlertText("글쓰는 페이지입니다.<br>도움말 모드는 개발 중이고,<br>궁금하신 것은 담당자에게 여쭤봐주세요!");
    },[])
    return (
        <Editor {...attr}></Editor>
    )
}

export default writeContainer;