<template>
    <div class="bg-brand-main w-full justify-center flex">
        <header class="geral-header justify-between items-center flex">
            <h1 class="geral-header__logo font-black"><a href="#" @click="changePage('/')">ShowMeTheProblem</a></h1>
            <nav class="geral-header__navigation" v-if="!logged">
                <button class="geral-header__link font-bold" data-create @click="toggleModalCreate">
                    Crie uma conta
                </button>
                <BaseButton @click="toggleModalLogin" data-login> Entrar </BaseButton>
            </nav>
            <nav class="geral-header__navigation" v-else>
                <button class="geral-header__link font-bold" @click="changePage('/credentials')">Credenciais</button>
                <button class="geral-header__link font-bold" @click="changePage('/feedbacks')">Feedbacks</button>
                <BaseButton>{{ nameUser }} (sair)</BaseButton>
            </nav>
        </header>
        <PartModal type-modal="create" :open="openCreateModal" @close="toggleModalCreate" />
        <PartModal type-modal="login" :open="openLoginModal" @close="toggleModalLogin" />
    </div>
</template>

<script lang="ts">
import PartModal from '../components/Modal/index.vue'
import router from '../router/index'
import BaseButton from './BaseButton/index.vue'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'GeralHeader',
    components: {
        BaseButton,
        PartModal,
    },
    setup() {
        const openCreateModal = ref(false)
        const openLoginModal = ref(false)

        const toggleModalCreate = () => {
            openCreateModal.value = !openCreateModal.value
        }

        const toggleModalLogin = () => {
            openLoginModal.value = !openLoginModal.value
        }
        const store = useStore()

        const changePage = (rota: string): void => {
            router.push(rota)
        }

        return {
            openCreateModal,
            toggleModalCreate,
            openLoginModal,
            toggleModalLogin,
            changePage,
            logged: computed(() => store.state.isLogged),
            nameUser: computed(() => store.state.userLogged.name),
        }
    },
})
</script>

<style lang="scss" scoped>
.geral-header {
    height: 129px;
    padding: 1rem;
    width: 100%;
    max-width: 1080px;

    &__link {
        color: theme('colors.brand.white');
        padding-right: 2rem;
    }

    &__logo {
        color: theme('colors.brand.white');
    }
}
</style>
