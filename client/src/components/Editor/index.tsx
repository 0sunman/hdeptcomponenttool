
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { writeSelector } from "../../recoils/pages";


const StyledInput = styled.div`
& input{
    width:100%;
    height:33px;
}
`
const StyledTextarea = styled.textarea`
width:100%;
height:300px;
font-size:18px;
padding-bottom:200px;
`

const StyledButton = styled.div`

& button{
    display:block;
    width:100%;
    height:50px;    
    position:fixed;
    left:0;
    bottom:0;
`

const Editor = ({title,content,path,selector,onChange,onClick,mode}:{
    title:string, 
    content:string, 
    path:string, 
    selector:string, 
    onChange:React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>, 
    onClick:React.MouseEventHandler<HTMLButtonElement>,
    mode:string
}) => {
    return (
        <div>
            <StyledInput><input name='title' type='text' onChange={onChange} placeholder="제목" value={title}/> </StyledInput>
            <StyledInput><input name='path' type='text' onChange={onChange} placeholder="템플릿 경로" value={path}/></StyledInput>
            <StyledInput><input name='selector' type='text' onChange={onChange} placeholder="제어 영역 셀렉터" value={selector}/></StyledInput>
            <div><StyledTextarea placeholder="코드" name='content' onChange={onChange} value={content}/></div>
            
        <StyledButton>
            <button onClick={onClick}>{(mode==="dev")?"수정":"글쓰기"}</button>
        </StyledButton>
        </div>
    )
}

export default Editor;