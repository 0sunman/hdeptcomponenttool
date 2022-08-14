import React, { useEffect } from "react";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import Popup from "../../components/Popup";
import { alertSelector, alertTextSelector } from "../../recoils/pages";

const Alert = () => {

    const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
    const onClose = () => {
        setAlertFlag(false);
    }
    useEffect(()=>{
        console.log(alertFlag, alertText)
    },[alertFlag])
    
    return (<Popup visible={alertFlag} onClose={onClose}>
                <div className="content"> 
                <p dangerouslySetInnerHTML={{__html: alertText}}></p>
                <button onClick={onClose}>확인</button>
                </div>
                
            </Popup>)
}

export default Alert;