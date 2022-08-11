import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Editor from "../../components/Editor";
import { ADD_CONTENTS } from "../../graphql/contents";
import { graphqlFetcher } from "../../lib/queryClient";
import { imgUrlSelector, writeSelector } from "../../recoils/pages";

const writeContainer = () =>{
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [path,setPath] = useState('');
    const [selector,setSelector] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [page, setPage] = useState('');

    const {mutate:addItem} = useMutation(()=>graphqlFetcher(ADD_CONTENTS,{title,path,selector,content,imgUrl}),{
        onSuccess:()=>{
            navigate("/");
        },
        onError:(e)=>{
            console.log(e);
            console.log("WriteContainer ::: 현재 에러가 발생중 이에요");
        }
    });

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
    
    const onClick = ()=>{
        if(title.length > 10 && content.length > 10){
            setPage({title,content,path,selector,imgUrl});
            addItem();
        }else{
            alert("10자이상 입력해야함");
        }
    }

    const onImageChange = ({imageUrl}:{imageUrl:string})=>{
        console.log(imageUrl);
        setImgUrl(imageUrl);
        alert("이미지가 업데이트 되었습니다.");
    }


    const attr = {title,content,path,selector,onChange,onClick,onImageChange,imgUrl,mode:"gen"}
    return (
        <Editor {...attr}></Editor>
    )
}

export default writeContainer;