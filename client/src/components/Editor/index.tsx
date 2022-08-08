import React, { SyntheticEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { writeSelector } from "../../recoils/pages";

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

const Editor = ({title,content,path,selector,onChange,onClick}:{
    title:string, 
    content:string, 
    path:string, 
    selector:string, 
    onChange:React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>, 
    onClick:React.MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <div>
            <StyledInput><input name='title' type='text' onChange={onChange} placeholder="제목" value={title}/> </StyledInput>
            <StyledInput><input name='path' type='text' onChange={onChange} placeholder="템플릿 경로" value={path}/></StyledInput>
            <StyledInput><input name='selector' type='text' onChange={onChange} placeholder="제어 영역 셀렉터" value={selector}/></StyledInput>
            <div><StyledTextarea placeholder="코드" name='content' onChange={onChange} value={content}/></div>
            <StyledButton><button onClick={onClick}>글작성</button></StyledButton>
        </div>
    )
}

export default Editor;