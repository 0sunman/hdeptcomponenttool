import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { ADD_CONTENTS } from "../graphql/contents";
import { useMutation, useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../lib/queryClient";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { writeSelector } from "../recoils/pages";
import { GET_TYPES } from "../graphql/types";
import WriteContainer from "../container/WriteContainer";


const writePage = () =>{
    return <WriteContainer></WriteContainer>
}

export default writePage;
