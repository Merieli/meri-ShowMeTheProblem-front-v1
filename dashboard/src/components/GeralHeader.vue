<template>
    <div class="bg-brand-main w-full justify-center flex">
        <header class="geral-header justify-between items-center flex">
            <h1 class="geral-header__logo font-black"><a href="#" @click="changePage('/')">ShowMeTheProblem</a></h1>
            <nav class="geral-header__navigation" v-if="!logged">
                <button id="button-create" class="geral-header__link font-bold" data-create @click="toggleModalCreate">
                    Crie uma conta
                </button>
                <BaseButton id="button-login" @click="toggleModalLogin" data-login>Entrar</BaseButton>
            </nav>
            <nav class="geral-header__navigation" v-else>
                <button
                    data-button="credentials"
                    class="geral-header__link font-bold"
                    @click="changePage('/credentials')"
                >
                    Credenciais
                </button>
                <button data-button="feedbacks" class="geral-header__link font-bold" @click="changePage('/feedbacks')">
                    Feedbacks
                </button>
                <BaseButton id="logout-button" @click="loggout()">{{ nameUser ? nameUser : '...' }} (sair)</BaseButton>
            </nav>
        </header>
        <PartModal data-modal="create" type-modal="create" :open="openCreateModal" @close="toggleModalCreate" />
        <PartModal data-modal="login" type-modal="login" :open="openLoginModal" @close="toggleModalLogin" />
    </div>
</template>

<script lang="ts">
import router from '../router/index';
import { useStore } from '../store';
import { Actions } from '../store/type-actions';
import BaseButton from './BaseButton/index.vue';
import PartModal from './PartModal.vue';
import { computed, defineComponent, onMounted, ref } from 'vue';

/**
 * Cabeçalho para todas as páginas da aplicação.
 * @displayName Geral Header
 */
export default defineComponent({
    name: 'GeralHeader',
    components: {
        BaseButton,
        PartModal,
    },
    setup() {
        const store = useStore();
        const openCreateModal = ref(false);
        const openLoginModal = ref(false);
        const logged = computed(() => store.state.isLogged);

        /**
         * Method Alterna o modal de criação de conta para ser oculto ou visivel
         */
        const toggleModalCreate = () => {
            openCreateModal.value = !openCreateModal.value;
        };

        /**
         * Alterna o modal de login para ser oculto ou visivel
         */
        const toggleModalLogin = () => {
            openLoginModal.value = !openLoginModal.value;
        };

        /**
         * Alterna a página atual
         * @param {string} rota caminho da página que será aberta ao clicar nos
         * botões do menu.
         */
        const changePage = (rota: string): void => {
            router.push(rota);
        };

        const loggout = (): void => {
            changePage('/');
            store.dispatch(Actions.LOGGOUT_USER);
        };

        /**
         * Captura os dados do usuário logado
         */
        onMounted(() => {
            if (window.localStorage.getItem('token') && logged.value == false) {
                store.dispatch(Actions.GET_USER);
            }
        });

        return {
            openCreateModal,
            toggleModalCreate,
            openLoginModal,
            toggleModalLogin,
            changePage,
            loggout,
            logged,
            nameUser: computed(() => store.state.userLogged.name),
        };
    },
});
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
<docs lang="md">
#### 📲 **_Exemplos de uso_**

```jsx
<GeralHeader />
```
</docs>
