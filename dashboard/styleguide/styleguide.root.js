import { store } from '../src/store';
import { h } from 'vue';

export default (previewComponent) => {
    return {
        store,

        render() {
            return h(previewComponent);
        },
    };
};
