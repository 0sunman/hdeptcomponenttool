import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import DetailPageContainer from "../container/DetailPageContainer";
import Document from "../container/DetailPageContainer/document";
import { currentTargetState } from "../recoils/pages";

const DetailPage = ()=>{
    const location = useLocation();
    if(location.pathname.indexOf("/document") > -1){
        return (
            <Document pageType={(location.pathname.indexOf("/dev") > -1) ? "dev" : "general"}></Document>
        )
    }else{
        return (
            <DetailPageContainer pageType={(location.pathname.indexOf("/dev") > -1) ? "dev" : "general"}></DetailPageContainer>
        )
    }
    
}
export default DetailPage;

