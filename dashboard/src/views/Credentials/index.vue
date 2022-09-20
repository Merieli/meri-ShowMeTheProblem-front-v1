<template>
    <div class="credentials">
        <GeralHeader />
        <section class="credentials__info text-brand-black">
            <h2 class="text-5xl font-black">Credenciais</h2>
            <p class="font-normal text-base">Guia de instalação e geração de suas credenciais</p>
        </section>
        <section class="credentials__all mt-8 flex flex-col w-full h-full">
            <h4 class="text-3xl font-black text-brand-darkgray">Instalação e configuração</h4>

            <p class="mt-10 text-lg text-left text-gray-800 font-regular">Este aqui é sua chave de api</p>
            <ContentLoader v-if="isLoading" class="rounded" width="600px" height="50px" />
            <div v-else class="credentials__apiKey bg-brand-gray py-3 pl-5 pr-20 mt-2 flex rounded max-w-2xl">
                {{ apiKey }}
                <div class="ml-20 mr-5">
                    <button type="button" class="cursor-pointer">
                        <UseIcon name="IconCopy" color="#ff0000" size="24" />
                    </button>
                    <button type="button">
                        <UseIcon name="IconLoading" color="#ff0000" size="24" />
                    </button>
                </div>
            </div>

            <p class="mt-5 text-lg text-left text-gray-800 font-regular">
                Coloque o script abaixo no seu site para começar a receber feedbacks
            </p>
            <ContentLoader v-if="isLoading" class="rounded" width="600px" height="50px" />
            <div v-else class="credentials__script bg-brand-gray py-3 pl-5 pr-20 mt-2 flex rounded max-w-2xl">
                <div class="w-full overflow-x-scroll">
                    <pre>
&lt;script src="https://merieli-feedbacker-widget.netifly.app?api_key={{ apiKey }}"&gt;&lt;/script&gt;</pre
                    >
                </div>
                <button type="button" class="cursor-pointer">
                    <UseIcon name="IconCopy" color="#ff0000" size="24" />
                </button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
// import palette from '../../../palette.js'
import ContentLoader from '../../components/ContentLoader.vue'
import GeralHeader from '../../components/GeralHeader.vue'
import UseIcon from '../../components/UseIcon/UseIcon.vue'
import { useStore } from '../../store'
import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
    name: 'PageCredencials',
    components: {
        GeralHeader,
        UseIcon,
        ContentLoader,
    },
    setup() {
        const store = useStore()

        return {
            apiKey: computed(() => store.getters.getApiKey),
            isLoading: computed(() => store.getters.isLoading),
            // brandColors: palette.brand,
        }
    },
})
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
}
</style>
