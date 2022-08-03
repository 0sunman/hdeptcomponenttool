import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { ADD_CONTENTS } from "../graphql/contents";
import { useMutation, useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { writeSelector } from "../recoils/pages";

const StyledInput = styled.div`
    & input{
        width:100%;
        height:33px;
        font-size:18px;
    }
`
const StyledTextarea = styled.textarea`
    width:100%;
    height:300px;
    font-size:18px;
`

const StyledButton = styled.div`

    & button{
        display:inline-block;
        width:100px;
        height:50px;    
    }
`

const writePage = () =>{
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const setPage = useSetRecoilState(writeSelector);
    
    const navigate = useNavigate();
    const onChange = (e) =>{
        const {name,value} = e.target;
        if(name == "title"){
            setTitle(value);
        }else if(name == "content"){
            setContent(value);
        }

    }
    const onClick = ()=>{
        if(title.length > 10 && content.length > 10){
            setPage({title,content});
        }else{
            alert("10자이상 입력해야함");
        }
    }
    return (
    <div>
        <StyledInput><input name='title' type='text' onChange={onChange} placeholder="제목"/></StyledInput>
        <div><StyledTextarea placeholder="코드" name='content' onChange={onChange}/></div>
        <StyledButton><button onClick={onClick}>글작성</button></StyledButton>
    </div>)
}

export default writePage;
