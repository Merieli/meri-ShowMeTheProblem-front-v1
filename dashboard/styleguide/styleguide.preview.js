var { store, key } = require('../src/store');
var tailwind = require('../src/assets/css/tailwind.css');
var fonts = require('../src/assets/sass/fonts.scss');

module.exports = function (app) {
    app.use(store, key);
    app.use(tailwind);
    app.use(fonts);
};
