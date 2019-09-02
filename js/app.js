var url = window.location.href;
var swLocation = '/calculo-diferencial-integral-I/sw.js';

if (navigator.serviceWorker) {

    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }
    // navigator.serviceWorker.register('/sw.js');
    navigator.serviceWorker.register(swLocation);
    // console.log('Podemos usar SW');
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

window.addEventListener('conectado', isOnline);
window.addEventListener('sin conexión', isOnline);

isOnline();