import { forwardRef, ReactNode, RefObject, SyntheticEvent, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { GET_TYPES } from "../../graphql/types";
import { graphqlFetcher, QueryKeys } from "../../lib/queryClient";
import { codeSelector, popupImageUploadSelector } from "../../recoils/pages";
import copyClipboard from "../../util/copyClipboard";
import ControlPaneContainer from "../ControlPane";
import ImageUploaderPopup from "../Popup/ImageUploader";
import ModifyContainer from "../WriteContainer/modify";

const DevContainer = forwardRef<HTMLIFrameElement,any>((props,ref)=>{/* 일반 */

    const {title,content,path,selector} = props.data.content[0]; 
    const [codeData,setCodeData] = useRecoilState<string>(codeSelector);
    const doCopyClipboard = () => {
        if(ref !== null && ref!.current !== null){
            copyClipboard(((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML)
        }
    }
    const [visibleImageUploaderPopup, setVisibleImageUploaderPopup] = useRecoilState(popupImageUploadSelector);
    const openImageUploaderPopup = () =>{
        setVisibleImageUploaderPopup({main:"flex"});
    }
    useEffect(()=>{
        try{
            ((ref.current) as HTMLIFrameElement).contentDocument!.querySelector(".content-section")!.innerHTML = codeData
        }catch(e){

        }
    },[codeData])
    const attr = {title,content,path,selector};
    return (
        <div>
            <ImageUploaderPopup/>
            <ControlPaneContainer copyCode={doCopyClipboard} ImageUploader={openImageUploaderPopup}>
                <div className="dev">
                    <ModifyContainer {...attr}></ModifyContainer>
                </div>
            </ControlPaneContainer>
        </div>
    )
})
export default DevContainer;