import { forwardRef, ReactNode, RefObject, useEffect, useState } from "react";

type Props = {
    children:React.ReactNode, 
    visible:Boolean,
    onClose?:React.MouseEventHandler<HTMLSpanElement> 
}

const Popup = ({children, visible, onClose}:Props) => {
    const [close, setClose] = useState("flex")
    const onAutoClose = ()=>{
        setClose(close === "flex" ? "none" : "flex");
    }
    return (            
    <div className="popup-bg" style={{display:(visible?"flex":"none")}}>
        <div className="popup">
            <span className="material-symbols-outlined close" onClick={onClose ? onClose : onAutoClose}>close</span>
            {children}
        </div>
    </div>
    )
};


export default Popup;