import { useStore, store, key } from '../src/store'
import Vue from 'vue'
import Vuex from 'vuex'

export default (previewComponent) => {
    // https://vuejs.org/v2/guide/render-function.html
    return {
        store,

        render(createElement) {
            return createElement(previewComponent)
        },
    }
}
