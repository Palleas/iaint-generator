// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
async function getBlobFromCanvas(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Canvas toBlob failed'));
            }
        });
    });
}

document.getElementById('download').addEventListener('click', () => {
    generateAndDownload();
});

document.getElementById('copy').addEventListener('click', () => {
    generateAndCopy();
});

document
    .getElementById('editable-dingus')
    .addEventListener('keypress', (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    });

document
    .getElementById('editable-dingus')
    .addEventListener('paste', (event) => {
        event.preventDefault();
    });

const getCanvasContent = async () => {
    const container = document.getElementById('conversation');
    return await html2canvas(container);
};

const generateAndCopy = async () => {
    const canvas = await getCanvasContent();
    const content = await getBlobFromCanvas(canvas);
    const data = [new ClipboardItem({ [content.type]: content })];
    await navigator.clipboard.write(data);
};

const generateAndDownload = async () => {
    try {
        const canvas = await getCanvasContent();

        const link = document.createElement('a');
        link.download = 'iaint.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error({ error });
        alert('An error occured!');
    }
};

const switchTheme = (theme) => {
    console.log('Switching theme', { theme });
    document.getElementById('conversation').dataset.theme = theme;
};

document.querySelectorAll('.styles-buttongroup button').forEach((element) => {
    element.addEventListener('click', (event) => {
        if (event.target['aria-pressed'] == 'true') {
            return;
        }

        document
            .querySelector('.styles button[aria-pressed=true]')
            .setAttribute('aria-pressed', 'false');
        console.log('Target', { target: event.target });
        event.target.setAttribute('aria-pressed', 'true');

        const theme = event.target.value;
        localStorage.setItem('theme', theme);
        switchTheme(theme);
    });
});

// Profile picture
document.getElementById('profile-picture').addEventListener('click', () => {
    document.getElementById('profile').click();
});

document.getElementById('profile').addEventListener('change', (event) => {
    const files = event.target.files;
    if (files && files.length && files.length > 0) {
        // reader.onLoad = () =
        const file = files[0];
        const img = document.getElementById('profile-picture');

        const reader = new FileReader();
        reader.onload = (e) => {
            localStorage.setItem('saved-picture', e.target.result);
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const picture = localStorage.getItem('saved-picture');
    if (picture !== null) {
        document.getElementById('profile-picture').src = picture;
    }

    const theme = localStorage.getItem('theme');
    if (theme !== null) {
        document
            .querySelector('.styles button[aria-pressed=true]')
            .setAttribute('aria-pressed', 'false');

        document
            .querySelector(`.styles button[value=${theme}]`)
            .setAttribute('aria-pressed', 'true');

        switchTheme(theme);
    }
});
