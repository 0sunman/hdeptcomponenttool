import React from "react";
import { forwardRef, ReactNode, RefObject, useEffect, useState } from "react";

type Props = {
    children:React.ReactNode, 
    visible:Boolean,
    onClose?:React.MouseEventHandler<HTMLSpanElement> 
}

const Popup = ({children, visible, onClose}:Props) => {
    return (            

    <div className="popup-bg" 
        style={{display:(visible?"flex":"none")}}>
        <div className="popup">
            <span className="material-symbols-outlined close" onClick={onClose}>close</span>
            {children}
        </div>
    </div>
    )
};


export default React.memo(Popup);