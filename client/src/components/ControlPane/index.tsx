import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { controlPaneSizeSelector } from "../../recoils/pages";

const ControlPane = ({children,copyClipboard,openImageUploaderPopup,switchTab,controlHeight}:{children:ReactNode, copyClipboard:any,openImageUploaderPopup:any,switchTab:any,controlHeight:any}) =>{
    const controlPaneSize = useRecoilValue(controlPaneSizeSelector);

    return ( 
        <div id="html_controller" style={{height:controlPaneSize+"%"}}>
            <div style={{width:"100%",textAlign:"center"}}>
                <button onClick={copyClipboard}>코드 복사</button>
                <button onClick={()=>openImageUploaderPopup()}>이미지 업로드</button>
                <button onClick={()=>switchTab("general")}>편집 모드</button>
                <button onClick={()=>switchTab("general")}>PC 모드</button>
                <button onClick={()=>switchTab("general")}>Mobile 모드</button>
                <button onClick={()=>controlHeight(5)}>숨기기</button>
                <button onClick={()=>controlHeight(20)}>20%</button>
                <button onClick={()=>controlHeight(30)}>30%</button>
                <button onClick={()=>controlHeight(40)}>40%</button>
                <button onClick={()=>controlHeight(50)}>50%</button>
                <button onClick={()=>controlHeight(80)}>80%</button>
            </div>            
            {children}
        </div>
    )




}
export default ControlPane