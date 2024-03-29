import request, {RequestDocument} from 'graphql-request';
import {
    QueryClient
} from 'react-query';

const BASE_URL = "https://zerosunshop.herokuapp.com/graphql";

export const getQueryClient = (()=>{
    let client:(QueryClient | null) = null
    return ()=>{
        if(!client) client = new QueryClient({
            defaultOptions:{
                queries:{
                    retry:1,
                    cacheTime:0,
                    staleTime:1000,
                    refetchOnReconnect:false,
                    refetchOnWindowFocus:false,
                    enabled :true
                },
            }
        });
        return client;
    }
})()

export const graphqlFetcher = async(query:RequestDocument, variables={}) => {return request(BASE_URL, query, variables)};

export const QueryKeys = {
    CONTENT : "CONTENT",
    TYPE : "TYPE"
}