const copyClipboard = (codeData:string) =>{
    const temp:HTMLTextAreaElement = document.createElement("textarea");
    temp.value = codeData;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("코드 복사가 완료되었습니다.")
}

export default copyClipboard;