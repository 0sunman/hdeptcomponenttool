import {gql} from 'graphql-tag';


export const GET_USER = gql`
    query Query($userid: String!, $password: String!) {
        user(userid: $userid, password: $password) {
            userid,
            password
        }
    }
`

export const ADD_USER = gql`
    mutation Mutation($userid: String!, $password: String!) {
        addUser(userid: $userid, password: $password) {
            userid
            password
        }
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($userid: String!, $password: String!) {
        loginUser(userid: $userid, password: $password) {
            userid,
            token
        }
    }
`


export const LOGOUT_USER = gql`
    mutation Mutation($userid: String!) {
        logoutUser(userid: $userid) {
            userid,
            isDone
        }
    }
`

export const IS_LOGIN = gql`
    mutation Mutation($userid: String!, $token: String!) {
        isLogin(userid: $userid, token: $token) {
            userid,
            isLogin,
            role
        }
    }
`