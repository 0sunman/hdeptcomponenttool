import React, { useEffect } from "react";
import { forwardRef, ReactNode, RefObject, useRef } from "react";
import { useRecoilState } from "recoil";
import Popup from "../../components/Popup";
import { popupImageUploadSelector } from "../../recoils/pages";


const PopupContainer = ({children,visible,onClose}:{children:React.ReactNode,visible:string,onClose:any}) =>{
    return <Popup visible={visible} onClose={onClose}>
        {children}
    </Popup>
}

export default PopupContainer;