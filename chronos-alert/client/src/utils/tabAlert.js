import { startFlashTabAlert, stopFlashFaviconAlert } from './faviconAlert';

let alertActive = false;

export function tabAlertUser() {
    if (document.visibilityState === 'visible') return;

    alertActive = true;

    startFlashTabAlert(
        `${process.env.PUBLIC_URL}/siren.ico`,
        `${process.env.PUBLIC_URL}/siren2.ico`
    );

    const stopTabAlert = () => {
        if (alertActive) {
            stopFlashFaviconAlert();
            alertActive = false;
        }
        document.removeEventListener('visibilitychange', stopTabAlert);
    };

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            stopTabAlert();
        }
    });

    // Ouvinte para parar o alerta quando a aba for clicada ou receber foco
    window.addEventListener('focus', stopTabAlert);
    window.addEventListener('click', stopTabAlert);
}