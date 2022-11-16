import { mount, VueWrapper } from '@vue/test-utils';
import WidgetBase from '@/views/WidgetBase.vue';

describe('WidgetBase.vue', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(WidgetBase);
    });

    test('Dado o html quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});
