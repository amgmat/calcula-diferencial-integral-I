importScripts('js/sw-utils.js');

// console.log('Hola');

const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'styles.f0080354005001a24de8.css',
    'img/frase.jpg',
    'favicon.png',
    'js/app.js',
    'js/sw-utils.js',
    'manifest.json',
    'scripts.859e64cef1ef944f8beb',
    'runtime-es2015.27965c48d77c449cb93c',
    'runtime-es5.ee2dcdf2e59a31c9da78',
    'polyfills-es2015.9aaba84b721d907ae919',
    'polyfills-es5.a5ec2c5f9c4a8eba6d56',
    'main-es2015.a65b24ad87e533415ab5',
    'main-es5.385e4f3e86eabadb47d6',
    'fractal3.6ebfe6f8c155c4fdd0d0',
    'espiral.d88986dab45b618db474',
    '3rdpartylicenses',
    'https://drive.google.com/file/d/1vGzc4JhTuhtSXD3rO8ZgnnurnKh7wA29/preview'


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