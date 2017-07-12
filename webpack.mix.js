const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.copy('node_modules/imperavi-kube/src/_scss/*', 'resources/assets/sass/vendor') // On copie les fichiers Kube CSS dans nos assets
.sass('resources/assets/sass/app.scss', 'public/css')
.js('resources/assets/js/app.js', 'public/js');


if(mix.config.inProduction) mix.version(); // Production uniquement car hash non supporté en mode HOT.