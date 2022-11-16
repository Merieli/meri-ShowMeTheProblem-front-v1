<template>
    <div class="flex flex-col items-center justify-between">
        <UseIcon name="IconError" color="#F88676" size="70" />
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

interface SetupReturn {
    goBack(): void;
}

export default defineComponent({
    components: {
        UseIcon,
    },
    setup(): SetupReturn {
        const store = useStore();

        const goBack = (): void => {
            store.commit(Mutations.RESET_STORE);
        };

        return {
            goBack,
        };
    },
});
</script>
