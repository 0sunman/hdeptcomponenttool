import { forwardRef, ReactNode, RefObject } from "react";

type Props = {
    children:React.ReactNode, 
    visible:string,
    onClose:React.MouseEventHandler<HTMLSpanElement> 
}

const Popup = ({children, visible, onClose}:Props) => {

    return (            
    <div className="popup-bg" style={{display:visible}}>
        <div className="popup">
            <span className="material-symbols-outlined close" onClick={onClose}>close</span>
            {children}
        </div>
    </div>
    )
};


export default Popup;