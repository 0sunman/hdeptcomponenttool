import { ReactNode, useRef } from "react";
import { useRecoilValue } from "recoil";
import { controlPaneSizeSelector } from "../../recoils/pages";
import styled from "styled-components";

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
    const [device_list, view_list] = [useRef<HTMLDivElement>(null),useRef<HTMLDivElement>(null)];
    return ( 
        <div id="html_controller" style={{height:controlPaneSize+"%"}}>
            <div style={{width:"100%",textAlign:"center"}}>
                <ControlList>
                    <ControlButton onClick={copyClipboard}>
                        <span className="material-symbols-outlined icon">content_paste</span>
                        <span className="text">코드 복사</span>
                    </ControlButton>
                    <ControlButton onClick={openImageUploaderPopup}>
                        <span className="material-symbols-outlined icon">image</span>
                        <span className="text">이미지</span>
                    </ControlButton>
                    
                    <ControlButton  onClick={()=>{
                        if((device_list.current as HTMLDivElement).style.display === "flex"){
                            (device_list.current as HTMLDivElement).style.display = "none";
                        }else{
                            (device_list.current as HTMLDivElement).style.display = "flex";
                            (view_list.current as HTMLDivElement).style.display = "none"    
                        }
                    }}>
                        <span className="material-symbols-outlined icon">devices</span>
                        <span className="text">디바이스</span>
                        <VerticalList className="devicecontrol" ref={device_list} style={{display:"none"}}>
                            <ControlButton onClick={()=>switchDevice("pc")}>
                                <span className="material-symbols-outlined icon">desktop_mac</span>
                                <span className="text">PC</span>
                            </ControlButton>
                            <ControlButton onClick={()=>switchDevice("mo")}>
                                <span className="material-symbols-outlined icon">phone_iphone</span>
                                <span className="text">Mobile</span>
                            </ControlButton>
                        </VerticalList>
                    </ControlButton>
                    <ControlButton onClick={()=>{
                        if((view_list.current as HTMLDivElement).style.display === "flex"){
                            (view_list.current as HTMLDivElement).style.display = "none";
                        }else{
                            (device_list.current as HTMLDivElement).style.display = "none";
                            (view_list.current as HTMLDivElement).style.display = "flex";    
                        }
                    }}>
                        <span className="material-symbols-outlined icon">zoom_out_map</span>
                        <span className="text">크기 조절</span>
                        <VerticalList className="sizecontrol" ref={view_list} style={{display:"none"}}>
                            <ControlButton onClick={()=>controlHeight(5)}>
                                0%
                            </ControlButton>
                            <ControlButton onClick={()=>controlHeight(20)}>
                                20%
                            </ControlButton>
                            <ControlButton onClick={()=>controlHeight(30)}>
                                30%
                            </ControlButton>
                            <ControlButton onClick={()=>controlHeight(40)}>
                                40%
                            </ControlButton>
                            <ControlButton onClick={()=>controlHeight(50)}>
                                50%
                            </ControlButton>
                            <ControlButton onClick={()=>controlHeight(80)}>
                                80%
                            </ControlButton>
                        </VerticalList>
                    </ControlButton>
                    

                </ControlList>

            </div>      
            <div className="controller">
                {children}
            </div>      
        </div>
    )




}
export default ControlPane