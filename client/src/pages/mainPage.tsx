import styled, { StyledComponent } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { GET_CONTENTS } from "../graphql/contents";
import { useRecoilState } from "recoil";
import { alertTextSelector, codeSelector, alertSelector, IdSelector, pathSelector, selectorSelector } from "../recoils/pages";
import { useEffect } from "react";
import Popup from "../components/Popup";
import Alert from "../components/Popup/alert";
import React from "react";
import ListContainer from "../container/ListContainer";



const MainPage = () => {
        return ( 
            <ListContainer></ListContainer>    
        )

}
export default MainPage;
