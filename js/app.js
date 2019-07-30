var url = window.location.href;
var swLocation = '/calculo1/sw.js';

if (navigator.serviceWorker) {

    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }
    // navigator.serviceWorker.register('/sw.js');
    navigator.serviceWorker.register(swLocation);
}


// Conexion

function isOnline() {
    if (navigator.onLine) {
        // tenemos conexion
        // console.log('onLine');
        mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK'
        });
    } else {
        // console.log('offline');
        mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();