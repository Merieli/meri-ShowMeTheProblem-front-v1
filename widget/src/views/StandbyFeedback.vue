<template>
    <div
        @click="() => emit('open-box')"
        class="fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full py-3 px-5 flex items-center shadow-xl cursor-pointer select-none animate__animated animate__fadeInUp animate__faster"
    >
        <UseIcon class="mr-3" name="IconChat" color="white" size="27" />
        <span class="font-black text-white text-xl">Deixe um Feedback</span>
    </div>
</template>
<script lang="ts">
import UseIcon from '@/components/UseIcon/UseIcon.vue';
import { defineComponent, SetupContext } from 'vue';

interface SetupReturn {
    emit: SetupContext['emit'];
}

export default defineComponent({
    components: { UseIcon },
    setup(props, { emit }: SetupContext): SetupReturn {
        return {
            emit,
        };
    },
});
</script>
