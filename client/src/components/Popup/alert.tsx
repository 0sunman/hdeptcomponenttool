import { ReactNode } from "react";
import Popup from "../../components/Popup";

const Alert = ({children, visible}:{children:ReactNode, visible:boolean}) => (<Popup visible={visible}>
            <div className="content"> {children} </div>
        </Popup>)

export default Alert;