import React from "react";
import { ReactNode, RefObject } from "react";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil"
import ControlPane from "../../components/ControlPane";
import { ADD_DOCUMENT } from "../../graphql/documents";
import { graphqlFetcher } from "../../lib/queryClient";
import { codeSelector,controlPaneSizeSelector } from "../../recoils/pages"
import copyClipboard from "../../util/copyClipboard";

//codeData,copyClipboard,openImageUploaderPopup,switchTab,controlHeight
const ControlPaneContainer = ({children, copyCode, ImageUploader, displaynone}:{children:ReactNode, copyCode:any, ImageUploader:any, displaynone?:boolean})=>{
    const codeData = useRecoilValue(codeSelector);
    const [controlPaneSize, setControlPaneSize] = useRecoilState(controlPaneSizeSelector);
    const openImageUploaderPopup = ImageUploader
    const controlHeight = (showRatio:number)=>{
        setControlPaneSize(showRatio);
    }
    const switchStyle = (site:string)=>{
        switch(site){
            case "cos":
            break;
            case "aos":
            break;
            default:
            break;
        }
    }
    
    const switchDevice = (string:string) => {
        /* TODO */
    }

    const switchVisible = (mode:string)=>{
        switch(mode){
            case "mobile":
            break;
            case "pc":
            break;
        }        
    }


    const attribute = {copyClipboard:copyCode,openImageUploaderPopup,switchDevice,controlHeight,displaynone}
    return (<ControlPane {...attribute}>{children}</ControlPane>)
}

export default React.memo(ControlPaneContainer);