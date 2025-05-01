// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
async function getBlobFromCanvas(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      });
    });
  }

document.getElementById("download").addEventListener("click", () => {
    generateAndDownload();
})

document.getElementById("copy").addEventListener("click", () => {
    generateAndCopy();
})

document.getElementById("editable-dingus").addEventListener("keypress", event => {
    if (event.key == "Enter") {
        event.preventDefault();
        event.target.blur();
    }
});

document.getElementById("editable-dingus").addEventListener("paste", event => { event.preventDefault(); });

const getCanvasContent = async () => {
    const container = document.getElementById("conversation");
    return await html2canvas(container)
}

const generateAndCopy = async () => {
    const canvas = await getCanvasContent();
    const content = await getBlobFromCanvas(canvas);
    const data = [new ClipboardItem({ [content.type]: content })];
    await navigator.clipboard.write(data);
}

const generateAndDownload = async () => {
    try {
        const canvas = await getCanvasContent();

        const link = document.createElement('a');
        link.download = 'html-image.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (error) {
        console.error({ error });
        alert("An error occured!");
    }

}

const switchTheme = (theme) => {
    console.log("Switching theme", {theme});
    document.getElementById("conversation").dataset.theme = theme    
}

document.querySelectorAll(".styles button").forEach(element => {
    element.addEventListener("click", (event) => switchTheme(event.target.value))
})