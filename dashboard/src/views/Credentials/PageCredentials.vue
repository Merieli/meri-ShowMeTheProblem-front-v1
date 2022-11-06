<template>
    <div class="credentials">
        <GeralHeader />
        <section class="credentials__info text-brand-black">
            <h2 class="text-5xl font-black">Credenciais</h2>
            <p class="font-normal text-base">Guia de instalação e geração de suas credenciais</p>
        </section>
        <section class="credentials__all mt-8 flex flex-col w-full h-full">
            <h4 class="text-3xl font-black text-brand-darkgray">Instalação e configuração</h4>

            <p class="mt-10 text-lg text-left text-gray-800 font-regular">Esta aqui é sua chave de api</p>
            <ContentLoader v-if="isLoading" class="rounded" width="600px" height="50px" />
            <div
                v-else
                id="api-key"
                class="credentials__apiKey bg-brand-gray py-3 px-5 mt-2 flex justify-between items-center rounded max-w-2xl"
            >
                {{ apiKey }}
                <div class="ml-5 min-w-max">
                    <button type="button" class="credentials__button cursor-pointer" @click="handleCopyText(apiKey)">
                        <UseIcon name="IconCopy" color="#A9A9A9" size="24" />
                    </button>
                    <button
                        id="button-generate-api-key"
                        type="button"
                        class="credentials__button cursor-pointer ml-4"
                        @click="generateNewKey"
                    >
                        <UseIcon name="IconLoading" color="#A9A9A9" size="24" />
                    </button>
                </div>
            </div>

            <p class="mt-5 text-lg text-left text-gray-800 font-regular">
                Coloque o script abaixo no seu site para começar a receber feedbacks
            </p>
            <ContentLoader v-if="isLoading" class="rounded" width="600px" height="50px" />
            <div
                v-else
                class="credentials__script bg-brand-gray py-3 px-5 mt-2 flex justify-between items-center rounded max-w-2xl"
            >
                <p id="script" class="w-full overflow-x-scroll whitespace-pre">
                    &lt;script src="{{ linkScript }}"&gt;&lt;/script&gt;"
                </p>
                <button
                    type="button"
                    class="credentials__button cursor-pointer ml-5"
                    @click="handleCopyText(getScript())"
                >
                    <UseIcon name="IconCopy" color="#A9A9A9" size="24" />
                </button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import ContentLoader from '../../components/ContentLoader.vue';
import GeralHeader from '../../components/GeralHeader.vue';
import UseIcon from '../../components/UseIcon/UseIcon.vue';
import { useStore } from '../../store';
import { Actions } from '../../store/type-actions';
import { computed, defineComponent } from '@vue/runtime-core';
import { ref } from 'vue';

export default defineComponent({
    name: 'PageCredencials',
    components: {
        GeralHeader,
        UseIcon,
        ContentLoader,
    },
    setup() {
        const store = useStore();
        const apiKey = computed(() => store.getters.getApiKey);
        const linkScript = ref(`https://merieli-feedbacker-widget.netifly.app?api_key=${apiKey.value}`);

        const generateNewKey = () => {
            store.dispatch(Actions.GENERATE_NEW_KEY);
        };

        const handleCopyText = (text: string) => {
            store.dispatch(Actions.HANDLE_COPY_TEXT, text);
        };

        const getScript = (): string => {
            const element = document.getElementById('script');
            return element?.textContent || '';
        };

        return {
            apiKey,
            isLoading: computed(() => store.getters.isLoading),
            linkScript,
            generateNewKey,
            handleCopyText,
            getScript,
        };
    },
});
</script>

<style lang="scss" scoped>
.credentials {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    &__info {
        background-color: theme('colors.brand.gray');
        text-align: center;
        padding: 6.43rem;
        width: 100%;
    }

    &__all {
        padding: 1rem;
        width: 100%;
        min-height: 500px;
        max-width: 1080px;
    }

    &__button {
        transition: 0.5s ease-out;
        position: relative;

        &:hover {
            opacity: 0.5;
        }

        &:active {
            top: 2px;
        }
    }
}
</style>
