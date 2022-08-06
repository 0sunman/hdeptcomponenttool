import { ReactNode } from "react";
import styled from "styled-components";


const Detail = styled.div`
    border:1px solid #000;
    margin:30px;
    margin-bottom:300px;
    & h2 {padding:20px; border-bottom:1px solid #000}
    & h2 span { font-size:1.4em; }
    & p,div {padding:20px; font-size:1.4em;}
    & div {padding-top:0px;}
    textarea{width:100%;height:500px;}
`

const DetailPageComponent = ({children}:{children:ReactNode}) => {
    return <Detail>{children}</Detail>
}

export default DetailPageComponent;