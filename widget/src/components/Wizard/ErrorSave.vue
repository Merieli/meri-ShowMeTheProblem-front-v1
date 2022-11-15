<template>
    <div class="flex flex-col items-center justify-between">
        <UseIcon name="IconError" :color="colors.brand.danger" size="70" />
        <p class="text-xl font-black text-center w-full mt-2">Droga! Acontecer algum erro.</p>
        <div class="flex justify-center items-center w-full mt-2">
            <button
                type="button"
                class="rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer focus:outline-none"
            >
                Tente novamente
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { Mutations } from '@/store/Mutations';
import { defineComponent } from 'vue';
import UseIcon from '../UseIcon/UseIcon.vue';
import colors from 'tailwindcss/colors';

interface SetupReturn {
    goBack(): void;
    colors: any;
}

export default defineComponent({
    components: {
        UseIcon,
    },
    props: {},
    setup(): SetupReturn {
        const store = useStore();

        const goBack = (): void => {
            store.commit(Mutations.RESET_STORE);
        };

        return {
            goBack,
            colors,
        };
    },
});
</script>
