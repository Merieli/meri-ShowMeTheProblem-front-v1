<template>
    <teleport to="body">
        <div
            class="overlay fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
            <div class="fixed mx-10">
                <div
                    class="modal w-96 flex flex-col overflow-hidden bg-white rounded-lg .animate__animated animate__faster animate__fadeInDown"
                >
                    <button @click.prevent="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <form class="px-12 py-10 bg-white" @submit.prevent="createUser">
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
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import useNotifier from '../../hooks/notification'
import { TypeOfNotification } from '../../interfaces/INotification'
import { Actions } from '../../store/type-actions'
import BaseButton from '../BaseButton.vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PartModal',
    components: {
        BaseButton,
    },
    props: {
        modalType: {
            type: String,
            required: true,
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
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
                console.log('Erro')
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
        }
    },
})
</script>

<style lang="scss" scoped>
.modal {
    z-index: 4;
}
.overlay {
    z-index: 0;
}
</style>
