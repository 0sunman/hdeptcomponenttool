import { ReactNode, useRef } from "react";
import { useRecoilValue } from "recoil";
import { controlPaneSizeSelector } from "../../recoils/pages";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import React from "react";

const ControlList = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
`
const ControlButton = styled.button`
    position:relative;
    height:65px;
    width:60px;
    & > span.icon{display:block;}
    & > span.text{display:inline-block;font-size:9px}
`
const VerticalList = styled.div`
    position:absolute !important;
    margin:0; padding:0 !important;
    &.sizecontrol{left:-182px;}
    &.devicecontrol{left:-2px;}
    top:-68px;
    display:flex;
    & button{width:60px;}
`

const ControlPane = ({children,copyClipboard,openImageUploaderPopup,switchDevice,controlHeight}:{children:ReactNode, copyClipboard:any,openImageUploaderPopup:any,switchDevice:any,controlHeight:any}) =>{
    const controlPaneSize = useRecoilValue(controlPaneSizeSelector);
    const location = useLocation();
    const [device_list, view_list] = [useRef<HTMLDivElement>(null),useRef<HTMLDivElement>(null)];
    const currentType = location.pathname.indexOf("/dev") > -1 ? "dev" : "gen"
    const goTo = (type:"gen"|"dev") =>{
        const detailId = location.pathname.split("/")[location.pathname.split("/").length -1]
        if(type === "gen"){
            window.location.href = `/detail/dev/${detailId}`;
        }else{
            window.location.href = `/detail/${detailId}`;
        }
    }
    const initHeight = currentType !== "dev" ? "85px" : "135px";
    return ( 
        <div id="html_controller" style={{height:`calc(${controlPaneSize}% + ${initHeight})`}}>
            <div className='controlpane'>
                <ControlList>
                    <ControlButton onClick={copyClipboard}>
                        <span className="material-symbols-outlined icon">content_paste</span>
                        <span className="text">코드 복사</span>
                    </ControlButton>
                    <ControlButton onClick={openImageUploaderPopup}>
                        <span className="material-symbols-outlined icon">image</span>
                        <span className="text">이미지</span>
                    </ControlButton>
                    
                    {currentType !== "dev" ? (
                    <ControlButton onClick={() => goTo("gen")}>
                        <span className="material-symbols-outlined icon">edit</span>
                        <span className="text">개발 모드</span>
                    </ControlButton>

                    ):(
                    <ControlButton onClick={() => goTo("dev")}>
                        <span className="material-symbols-outlined icon">face</span>
                        <span className="text">일반 모드</span>
                    </ControlButton>
                    )}
                    

                </ControlList>

            </div>      
            <div className="controller">
                {children}
            </div>      
        </div>
    )




}
export default React.memo(ControlPane)