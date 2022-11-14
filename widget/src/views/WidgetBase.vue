<template>
    <teleport to="body">
        <component @open-box="handleOpenBox" @close-box="handleCloseBox" :is="currentComponent" />
    </teleport>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { useStore } from '../store';
import StandbyFeedback from './StandbyFeedback.vue';
import BoxFeedback from './BoxFeedback.vue';
import { Mutations } from '@/store/Mutations';
import { StateStore } from '@/interfaces';

interface SetupReturn {
    currentComponent: ComputedRef<StateStore>;
    handleOpenBox(): void;
    handleCloseBox(): void;
}

export default defineComponent({
    components: {
        StandbyFeedback,
        BoxFeedback,
    },
    setup(): SetupReturn {
        const store = useStore();

        const handleOpenBox = () => {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'BoxFeedback');
        };
        const handleCloseBox = () => {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'StandbyFeedback');
        };

        return {
            currentComponent: computed(() => store.getters.currentComponent),
            handleOpenBox,
            handleCloseBox,
        };
    },
});
</script>
<style lang="scss" scoped></style>
