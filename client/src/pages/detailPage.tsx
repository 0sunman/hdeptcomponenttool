import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { alertSelector } from "../recoils/pages";
import DetailPageContainer from "../container/DetailPageContainer";

const DetailPage = ()=>{
    const location = useLocation();
    return (
        <DetailPageContainer pageType={(location.pathname.indexOf("/dev") > -1) ? "dev" : "general"}></DetailPageContainer>
    )
    
}
export default DetailPage;

