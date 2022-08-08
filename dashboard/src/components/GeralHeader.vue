<template>
    <div class="bg-brand-main w-full justify-center flex">
        <header class="geral-header justify-between items-center flex">
            <h1 class="geral-header__logo font-black"><a href="#">ShowMeTheProblem</a></h1>
            <nav class="geral-header__navigation">
                <button class="geral-header__link font-bold" data-create @click="handleAccountCreate">
                    Crie uma conta
                </button>
                <BaseButton @click="handleLogin" data-login> Entrar </BaseButton>
            </nav>
        </header>
        <PartModal modalType="create" v-if="isShow && type === 'create'" @close="closeModal">
            <template v-slot:title>
                <legend class="font-black text-3xl">Crie uma conta</legend>
            </template>
            <template v-slot:content>
                <form class="modal__form mx-12 my-10 mt-0" @submit.prevent="createUser">
                    <fieldset class="flex flex-col">
                        <label for="name" class="font-bold text-lg" id="create-name"> Nome </label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="text"
                            name="name"
                            placeholder="Seu Nome Aqui"
                            v-model="name"
                            autocomplete="on"
                            required
                            data-form-name
                        />
                        <label for="email" class="font-bold text-lg">E-mail</label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="email"
                            name="email"
                            placeholder="email@exemplo.com"
                            v-model="email"
                            autocomplete="on"
                            required
                        />
                        <label for="password" class="font-bold text-lg">Senha</label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="password"
                            name="password"
                            placeholder="******"
                            v-model="password"
                            required
                        />
                    </fieldset>

                    <BaseButton color="dark" type-button="submit">Criar conta</BaseButton>
                </form>
            </template>
        </PartModal>
        <PartModal modalType="create" v-if="isShow && type === 'login'" @close="closeModal">
            <template v-slot:title>
                <legend class="font-black text-3xl">Entre na sua conta</legend>
            </template>
            <template v-slot:content>
                <form class="modal__form mx-12 my-10 mt-0" @submit.prevent="loginUser" data-modal-form>
                    <fieldset class="flex flex-col">
                        <label for="email" class="font-bold text-lg">E-mail</label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="email"
                            name="email"
                            placeholder="email@exemplo.com"
                            v-model="email"
                            autocomplete="on"
                            required
                        />
                        <label for="password" class="font-bold text-lg">Senha</label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="password"
                            name="password"
                            placeholder="******"
                            v-model="password"
                            required
                        />
                    </fieldset>

                    <BaseButton color="dark" type-button="submit">Entrar</BaseButton>
                </form>
            </template>
        </PartModal>
    </div>
</template>

<script lang="ts">
import PartModal from '../components/Modal/index.vue'
import useNotifier from '../hooks/notifier'
import { TypeOfNotification } from '../interfaces/INotification'
import { Actions } from '../store/type-actions'
import BaseButton from './BaseButton/index.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'GeralHeader',
    components: {
        BaseButton,
        PartModal,
    },
    setup() {
        const router = useRouter()

        const isShow = ref(false)
        const type = ref('')

        const store = useStore()
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const { notify } = useNotifier()

        onMounted(() => {
            const token = window.localStorage.getItem('token')

            if (token) {
                router.push({ name: 'Feedbacks' })
            }
        })

        const handleLogin = () => {
            isShow.value = true
            type.value = 'login'
        }

        function handleAccountCreate() {
            isShow.value = true
            type.value = 'create'
        }

        const createUser = () => {
            if (name.value != '' && email.value != '' && password.value != '') {
                store
                    .dispatch(Actions.REGISTER_USER, {
                        name: name.value,
                        email: email.value,
                        password: password.value,
                    })
                    .then(() => cleanAndNotify('', 'Login efetuado com sucesso'))
            } else {
                notify(TypeOfNotification.FALHA, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
            }
        }

        const loginUser = () => {
            store
                .dispatch(Actions.LOGIN_USER, {
                    email: email.value,
                    password: password.value,
                })
                .then(() => cleanAndNotify('Conta Registrada', 'Sua conta foi criada com sucesso, efetue login.'))
        }

        const cleanAndNotify = (title: string, text: string) => {
            name.value = ''
            email.value = ''
            password.value = ''

            isShow.value = false

            notify(TypeOfNotification.SUCESSO, title, text)
        }

        const closeModal = () => {
            isShow.value = false
            type.value = ''
        }
        return {
            closeModal,
            name,
            email,
            password,
            createUser,
            loginUser,
            notify,
            handleLogin,
            isShow,
            handleAccountCreate,
            type,
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
