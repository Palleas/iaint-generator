document.getElementById("generate").addEventListener("click", () => {
    draw();
})


document.getElementById("editable-dingus").addEventListener("keypress", event => {
    if (event.key == "Enter") {
        event.preventDefault();
        event.target.blur();
    }
});

document.getElementById("editable-dingus").addEventListener("paste", event => { event.preventDefault(); });

const draw = async () => {
    const container = document.getElementById("conversation");
    try {
        const canvas = await html2canvas(container)

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