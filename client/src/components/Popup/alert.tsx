import React from "react";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import Popup from "../../components/Popup";
import { alertSelector, alertTextSelector } from "../../recoils/pages";

const Alert = () => {

    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const onClose = () => {
        setAlertFlag(false);
    }
    
    return (<Popup visible={alertFlag} onClose={onClose}>
                <div className="content"> {alertText} </div>
            </Popup>)
}

export default Alert;