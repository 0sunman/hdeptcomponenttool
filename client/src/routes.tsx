import React from "react";
import GlobalLayout from "./pages/_layout"
const MainPage = React.lazy(()=>import('./pages/mainPage'));
const DetailPage = React.lazy(()=>import('./pages/detailPage'));
const WritePage = React.lazy(()=>import('./pages/writePage'));

export const routes = [
    {
        path:"/",
        element:<GlobalLayout/>,
        children:[
            {path :"/", element:<MainPage/>,index:true},
            {path :"/detail/:id", element:<DetailPage/>,index:false},
            {path :"/write", element:<WritePage/>,index:false}
        ]
    }
]