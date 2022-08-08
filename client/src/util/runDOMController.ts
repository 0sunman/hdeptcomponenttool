const runDOMController = (iframeDocument:Document)=>{
    const vdom = document.createDocumentFragment();
    document.querySelectorAll("#html_controller .general > div").forEach(element=>element.remove())
    Array.prototype.slice.call(iframeDocument.querySelectorAll(".content-section *[data-target-control]")).every(element=>{

        const targetControl = element.dataset.targetControl;
        const [name,target] = targetControl.split("_");
        const targets = target.split("-");
        targets.every((target:string)=>{
            const [div, titleElement, inputElement] = [document.createElement("div"), document.createElement("span"), document.createElement("input")]
            div.appendChild(titleElement);
            div.appendChild(inputElement);

            titleElement.className = "control-title"
            inputElement.className = "control-input"
            inputElement.type = "text";

            switch(target){
                case "href":
                    titleElement.innerText = name +" 링크"    
                    inputElement.value = element.href;
                    inputElement.addEventListener("keyup",()=>{
                        element.href = inputElement.value;                        
                    })                   
                    break;
                case "text":
                    titleElement.innerText = name +" 일반 텍스트"          
                    inputElement.value = element.innerText;   
                    inputElement.addEventListener("keyup",()=>{       
                        element.innerText = inputElement.value;                
                    })                   
                break;
                case "src":
                    titleElement.innerText = name +" 이미지"         
                    inputElement.value = element.href;             
                    inputElement.addEventListener("keyup",()=>{       
                        element.href = inputElement.value;                
                    })                                        
                break;
                case "style":
                    titleElement.innerText = name +" 스타일"         
                    inputElement.value = element.getAttribute("style");      
                    inputElement.addEventListener("keyup",()=>{       
                        element.setAttribute("style",inputElement.value);              
                    })                   
                break;
                case "class":
                    debugger;
                    titleElement.innerText = name +" 클래스"         
                    inputElement.value = element.getAttribute("className");      
                    inputElement.addEventListener("keyup",()=>{       
                        element.style.className = inputElement.value;         
                    })                   
                break;
                default:
                    debugger;
                break;
            } 
            vdom.appendChild(div);
            return true;
        })
        return true;
    })
    document.querySelector("#html_controller .general")?.appendChild(vdom);
    
}

export default runDOMController;