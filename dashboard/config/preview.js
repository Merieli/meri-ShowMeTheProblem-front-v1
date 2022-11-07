// import focusDirective from '../src/directives/v-focus';
import { store } from '../src/store';
import { defineEnhanceApp } from 'vue-styleguidist';

export default defineEnhanceApp((app) => {
    app.directive(store);
});
