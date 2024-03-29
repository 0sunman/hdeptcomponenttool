import React from "react";
import GlobalLayout from "./pages/_layout"
const MainPage = React.lazy(()=>import('./pages/mainPage'));
const DetailPage = React.lazy(()=>import('./pages/detailPage'));
const WritePage = React.lazy(()=>import('./pages/writePage'));
const ViewPage = React.lazy(()=>import('./pages/ViewPage'));

export const routes = [
    {
        path:"/",
        element:<GlobalLayout/>,
        children:[
            {path :"/", element:<MainPage/>,index:true},
            {path :"/detail/:id", element:<DetailPage/>,index:false},
            {path :"/detail/dev/:id", element:<DetailPage/>,index:false},
            {path :"/document/:id", element:<DetailPage/>,index:false},
            {path :"/document/dev/:id", element:<DetailPage/>,index:false},
            {path :"/write", element:<WritePage/>,index:false},
        ]
    },
    
    
    {path :"/page/:id", 
    element :<ViewPage/>}
]