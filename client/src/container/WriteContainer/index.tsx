import { SyntheticEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Editor from "../../components/Editor";
import { writeSelector } from "../../recoils/pages";

const writeContainer = () =>{
    
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [path,setPath] = useState('');
    const [selector,setSelector] = useState('');
    const setPage = useSetRecoilState(writeSelector);
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
        }
    }
    
    const onClick = ()=>{
        if(title.length > 10 && content.length > 10){
            setPage({title,content,path,selector});
        }else{
            alert("10자이상 입력해야함");
        }
    }


    const attr = {title,content,path,selector,onChange,onClick,mode:"gen"}
    return (
        <Editor {...attr}></Editor>
    )
}

export default writeContainer;