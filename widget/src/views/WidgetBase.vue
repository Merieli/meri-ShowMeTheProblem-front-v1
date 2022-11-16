<template>
    <teleport to="body">
        <component @open-box="handleOpenBox" @close-box="handleCloseBox" :is="state.currentComponent" />
    </teleport>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import StandbyFeedback from './StandbyFeedback.vue';
import BoxFeedback from './BoxFeedback.vue';
import useIframeControl from '@/hooks/Iframe';

interface SetupReturn {
    state: State;
    handleOpenBox(): void;
    handleCloseBox(): void;
}

interface State {
    currentComponent: string;
}

export default defineComponent({
    components: {
        StandbyFeedback,
        BoxFeedback,
    },
    setup(): SetupReturn {
        const iframe = useIframeControl();
        const state = reactive<State>({
            currentComponent: 'StandbyFeedback',
        });

        watch(
            () => state.currentComponent,
            () => {
                iframe.updateCoreValuesOnStore();
            }
        );

        const handleOpenBox = () => {
            iframe.notifyOpen();
            state.currentComponent = 'BoxFeedback';
        };
        const handleCloseBox = () => {
            iframe.notifyClose();
            state.currentComponent = 'StandbyFeedback';
        };

        return {
            state,
            handleOpenBox,
            handleCloseBox,
        };
    },
});
</script>
