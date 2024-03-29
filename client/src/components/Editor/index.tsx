
import React from "react";
import styled from "styled-components";
import ImageUploader from "../../container/ImageUpload/ImageUploader";
import BottomButton from "../Styled/BottomButton";


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



const StyledButtonTwoblock = styled.div`

& button:first-child{
    display:inline-block;
    width:20%;
    height:50px;    
    left:0;
    bottom:0;
}

& button:last-child{
    display:inline-block;
    width:80%;
    height:50px;    
    right:0;
    bottom:0;
}
`

const Editor = ({title,content,path,selector,imgUrl,onChange,onClick,onImageChange,mode,onRemove}:{
    title:string, 
    content:string, 
    path:string, 
    selector:string, 
    imgUrl:string,
    onChange:React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>, 
    onClick:React.MouseEventHandler<HTMLButtonElement>,
    onImageChange:any,
    mode:string,
    onRemove?:React.MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <div>
            <StyledInput><input name='title' type='text' onChange={onChange} placeholder="제목" value={title}/> </StyledInput>
            <StyledInput>
                <ImageUploader onImageChange={onImageChange}></ImageUploader>
                <input name='imgUrl' type='hidden' placeholder="대표 이미지 URL" value={imgUrl}/>
            </StyledInput>
            <StyledInput><input name='path' type='text' onChange={onChange} placeholder="템플릿 경로" value={path}/></StyledInput>
            <StyledInput><input name='selector' type='text' onChange={onChange} placeholder="제어 영역 셀렉터" value={selector}/></StyledInput>
            <div><StyledTextarea placeholder="코드" name='content' onChange={onChange} value={content}/></div>
            
            {(mode==="dev")?
                <StyledButtonTwoblock>
                    <button onClick={onRemove}>삭제</button>
                    <button onClick={onClick}>수정</button>
                </StyledButtonTwoblock>
                    :
                <BottomButton><button onClick={onClick}>등록</button></BottomButton>
            }
        </div>
    )
}

export default React.memo(Editor);