import request, {RequestDocument} from 'graphql-request';
import {
    QueryClient
} from 'react-query';

const BASE_URL = "http://10.108.70.52:8080/graphql";

export const getQueryClient = (()=>{
    let client:(QueryClient | null) = null
    return ()=>{
        if(!client) client = new QueryClient({
            defaultOptions:{
                queries:{
                    cacheTime:1000*60*60*24,
                    staleTime:1000,
                    refetchOnReconnect:false,
                    refetchOnWindowFocus:false,
                    enabled :true
                }
            }
        });
        return client;
    }
})()

export const graphqlFetcher = async(query:RequestDocument, variables={}) => {return request(BASE_URL, query, variables)};

export const QueryKeys = {
    CONTENT : "CONTENT",
}