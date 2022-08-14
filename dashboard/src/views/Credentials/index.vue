<template>
    <div>
        <GeralHeader />
        <section class="credentials__info text-brand-black">
            <h2 class="text-5xl font-black mb-2">Credenciais</h2>
            <p class="font-normal text-base">Guia de instalação e geração de suas credenciais</p>
        </section>
        <section class="credentials__all mt-8">
            <h4>Instalação e configuração</h4>
            <p>Este aqui é sua chave de api</p>
            <div class="credentials__apiKey">
                <button type="button">copiar chave</button>
                <button type="button">atualizar chave</button>
            </div>
            <p>Coloque o script abaixo no seu site para começar a receber feedbacks</p>
            <div class="credentials__script">
                <button type="button">copiar script</button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import GeralHeader from '../../components/GeralHeader.vue'

export default {
    name: 'PageCredencials',
    components: {
        GeralHeader,
    },
}
</script>

<style lang="scss" scoped>
.credentials {
    &__info {
        background-color: theme('colors.brand.gray');
        text-align: center;
        padding: 6.43rem;
    }
    &__all {
        display: flex;
    }
}
</style>
