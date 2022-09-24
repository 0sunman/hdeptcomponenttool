import { useRef, useState } from "react";

const useResizeHooks = ()=>{
    const handle = useRef<HTMLDivElement>(null)
    const [positionX, setPositionX] = useState<number>(70);
    const [flag, setFlag] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(true);
    const MouseMoveEvent = (e)=>{
        const {clientWidth, clientHeight} = document.body
        const {pageX, pageY} = e
        if(flag){
            setPositionX(((pageX-10)/clientWidth) * 100);
        }
    }
    
    const TouchMoveEvent = (e)=>{
        const {clientWidth, clientHeight} = document.body
        const {clientX, ClientY} = e.changedTouches[0]
        if(flag){
            setPositionX(((clientX-10)/clientWidth) * 100);
        }
    }
    const MouseDownEvent = ()=>{
        handle.current!.style.cursor = "col-resize"
        setFlag(true)
        setShow(false)
    }

    const TouchStartEvent = ()=>{
        handle.current!.style.cursor = "col-resize"
        setFlag(true)
        setShow(false)
    }

    const MouseUpEvent = ()=>{
        handle.current!.style.cursor = "default"
        setFlag(false)
        setShow(true)
    }
    return [handle,positionX,setPositionX,flag,setFlag,show,setShow,MouseMoveEvent,TouchMoveEvent,MouseDownEvent,TouchStartEvent,MouseUpEvent]
}


export default useResizeHooks;