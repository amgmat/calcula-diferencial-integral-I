importScripts('js/sw-utils.js');

// console.log('Hola');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'contacto.html',
    'bibliografia.html',
    'guia1.html',
    'css/estilos.css',
    'img/fractal3.jpg',
    'img/frase.jpg',
    'img/favicon.png',
    'js/app.js',
    'js/sw-utils.js'

];

const APP_SHELL_INMUTABLE = [
    'js/libs/plugins/mdtoast.min.css',
    'js/libs/plugins/mdtoast.min.js'

];

self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));


    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {
            // console.log(e.request.url);
            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }




    });


    e.respondWith(respuesta);

});