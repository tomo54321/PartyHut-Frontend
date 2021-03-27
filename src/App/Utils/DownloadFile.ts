export const DownloadFile = (contents: string, fileName: string): Boolean => {

    let file = new Blob([contents], { type: "application/octet-stream" });
    let fileURL = window.URL.createObjectURL(file);

    let downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = fileURL;

    document.body.append(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(fileURL);

    return true;

};