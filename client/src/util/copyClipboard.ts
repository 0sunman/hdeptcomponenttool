const copyClipboard = (codeData:string) =>{
    const temp:HTMLTextAreaElement = document.createElement("textarea");
    temp.value = codeData;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
}

export default copyClipboard;