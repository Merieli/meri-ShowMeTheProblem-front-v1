<template>
    <div class="bg-brand-main w-full justify-center flex">
        <header class="geral-header justify-between items-center flex">
            <h1 class="geral-header__logo font-black"><a href="#">ShowMeTheProblem</a></h1>
            <nav class="geral-header__navigation">
                <button class="geral-header__link font-bold" @click="handleAccountCreate">Crie uma conta</button>
                <BaseButton @click="handleLogin"> Entrar </BaseButton>
            </nav>
        </header>
        <PartModal modalType="create" v-if="isShow" @close="!isShow">
            <template v-slot:content>
                <form class="px-12 py-10" @submit.prevent="createUser">
                    <fieldset class="flex flex-col">
                        <legend class="font-black text-3xl mb-8">Crie uma conta</legend>
                        <label for="name" class="font-bold text-lg"> Nome </label>
                        <input
                            class="bg-slate-50 mb-6 p-3"
                            type="text"
                            name="name"
                            placeholder="Seu Nome Aqui"
                            v-model="name"
                            autocomplete="on"
                            required
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
        <PartModal modalType="login" v-if="isShow" @close="!isShow" />
    </div>
</template>

<script lang="ts">
import BaseButton from '../components/BaseButton.vue'
import PartModal from '../components/Modal/index.vue'
import useNotifier from '../hooks/notifier'
import { TypeOfNotification } from '../interfaces/INotification'
import { Actions } from '../store/type-actions'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'GeralHeader',
    components: {
        BaseButton,
        PartModal,
    },
    setup(props, { emit }) {
        const router = useRouter()

        const isShow = ref(false)

        onMounted(() => {
            const token = window.localStorage.getItem('token')

            if (token) {
                router.push({ name: 'Feedbacks' })
            }
        })

        const handleLogin = () => {
            isShow.value = true
        }

        function handleAccountCreate() {
            isShow.value = true
        }

        const store = useStore()
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const showAlert = ref(false)

        const { notify } = useNotifier()

        const createUser = () => {
            if (name.value != '' && email.value != '' && password.value != '') {
                store
                    .dispatch(Actions.REGISTER_USER, {
                        name: name.value,
                        email: email.value,
                        password: password.value,
                    })
                    .then(() => cleanAndNotify())
            } else {
                notify(TypeOfNotification.FALHA, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
            }
        }

        const cleanAndNotify = () => {
            name.value = ''
            email.value = ''
            password.value = ''

            notify(TypeOfNotification.SUCESSO, 'Conta Registrada', 'Sua conta foi criada com sucesso, efetue login.')
            showAlert.value = true
        }

        const closeModal = () => {
            return emit('close')
        }
        return {
            closeModal,
            props,
            name,
            email,
            password,
            createUser,
            notify,
            handleLogin,
            isShow,
            handleAccountCreate,
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
