import React from "react";
import styled from "styled-components"

const BottomButton = styled.div`

& button{
    display:block;
    width:100%;
    height:50px;    
    position:fixed;
    left:0;
    bottom:0;
}
`

export default React.memo(BottomButton);