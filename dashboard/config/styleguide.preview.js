var { store, key } = require('../src/store');

// The export here MUST be default or module.export
// this is what is imported by the styleguide
module.exports = function (app) {
    app.use(store, key);
};
