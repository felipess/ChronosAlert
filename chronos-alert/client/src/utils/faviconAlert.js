let originalFavicon = document.querySelector("link[rel~='icon']").href;
let isFlashing = false;
let intervalId;

export function startFlashTabAlert(faviconUrl1, faviconUrl2) {
    if (isFlashing) return;
    isFlashing = true;

    intervalId = setInterval(() => {
        const currentFavicon = getCurrentFavicon();
        const newFavicon = currentFavicon.includes(faviconUrl1) ? faviconUrl2 : faviconUrl1;
        changeTabFavicon(`${newFavicon}?t=${new Date().getTime()}`);
    }, 500);
}

export function stopFlashFaviconAlert() {
    changeTabFavicon(originalFavicon);
    clearInterval(intervalId);
    isFlashing = false;
}

function getCurrentFavicon() {
    return document.querySelector("link[rel~='icon']")?.href;
}

function changeTabFavicon(src) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = src;
}
