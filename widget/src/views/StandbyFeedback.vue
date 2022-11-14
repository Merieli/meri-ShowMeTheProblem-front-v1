<template>
    <div
        @click="() => emit('open-box')"
        class="fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full py-3 px-5 flex items-center shadow-xl cursor-pointer select-none animate__animated animate__fadeInUp animate__faster"
    >
        <span class="font-black text-white text-xl">Deixe um Feedback</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

interface SetupReturn {
    emit: SetupContext['emit'];
}

export default defineComponent({
    props: {},
    setup(props, { emit }: SetupContext): SetupReturn {
        return {
            emit,
        };
    },
});
</script>
<style lang="scss" scoped></style>
