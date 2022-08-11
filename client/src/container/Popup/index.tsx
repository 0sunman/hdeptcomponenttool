import React from "react";
import Popup from "../../components/Popup";


const PopupContainer = ({children,visible,onClose}:{children:React.ReactNode,visible:string,onClose:any}) =>{
    return <Popup visible={visible} onClose={onClose}>
        {children}
    </Popup>
}

export default PopupContainer;