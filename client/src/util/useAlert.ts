import { SetterOrUpdater, useRecoilState } from "recoil";
import { alertSelector, alertTextSelector } from "../recoils/pages";

type Alert = {
    alertFlag: boolean;
    setAlertFlag: SetterOrUpdater<boolean>;
    alertText: string;
    setAlertText: SetterOrUpdater<string>;
}

const [[alertFlag,setAlertFlag],[alertText,setAlertText]] = [useRecoilState<boolean>(alertSelector), useRecoilState<string>(alertTextSelector)];
const useAlert = ():Alert=>({
        alertFlag,setAlertFlag,alertText,setAlertText
    })

export default useAlert;