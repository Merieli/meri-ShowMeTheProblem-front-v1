<template>
    <teleport to="body">
        <div
            class="overlay fixed top-0 left-0 z-1 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            v-show="open"
            @click="closeModal"
        >
            <transition name="moda-animation-inner">
                <div class="fixed mx-10" @click.stop>
                    <div
                        class="modal w-96 z-10 flex flex-col overflow-hidden bg-white rounded-lg .animate__animated animate__faster animate__fadeInDown"
                    >
                        <div class="modal__header mx-8 my-8">
                            <legend v-if="typeModal == 'create'" class="font-black text-3xl">Crie uma conta</legend>
                            <legend v-else class="font-black text-3xl">Entre na sua conta</legend>
                            <button @click="closeModal" class="modal__button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                    <path
                                        d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="modal__content">
                            <form
                                v-if="typeModal == 'create'"
                                class="modal__form mx-12 my-10 mt-0"
                                @submit.prevent="createUser"
                            >
                                <fieldset class="flex flex-col">
                                    <label for="name" class="font-bold text-lg" id="create-name"> Nome </label>
                                    <input
                                        class="bg-slate-50 mb-6 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.email.errorMessage,
                                        }"
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
                                        class="bg-slate-50 mb-6 p-3 text-lg border-2 border-transparent rounded"
                                        type="email"
                                        name="email"
                                        placeholder="email@exemplo.com"
                                        v-model="email"
                                        autocomplete="on"
                                        required
                                    />
                                    <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
                                        {{ state.email.errorMessage }}
                                    </span>
                                    <label for="password" class="font-bold text-lg">Senha</label>
                                    <input
                                        class="bg-slate-50 mb-6 p-3 text-lg border-2 border-transparent rounded"
                                        type="password"
                                        name="password"
                                        placeholder="******"
                                        v-model="password"
                                        required
                                    />
                                </fieldset>

                                <BaseButton color="dark" type-button="submit">Criar conta</BaseButton>
                            </form>
                            <form
                                v-else
                                class="modal__form mx-12 my-10 mt-0"
                                @submit.prevent="loginUser"
                                data-modal-form
                            >
                                <fieldset class="flex flex-col">
                                    <label for="email" class="font-bold text-lg">E-mail</label>
                                    <input
                                        class="bg-slate-50 mb-6 p-3 text-lg border-2 border-transparent rounded"
                                        type="email"
                                        name="email"
                                        placeholder="email@exemplo.com"
                                        v-model="email"
                                        autocomplete="on"
                                        required
                                    />
                                    <label for="password" class="font-bold text-lg">Senha</label>
                                    <input
                                        class="bg-slate-50 mb-6 p-3 text-lg border-2 border-transparent rounded"
                                        type="password"
                                        name="password"
                                        placeholder="******"
                                        v-model="password"
                                        required
                                    />
                                </fieldset>

                                <BaseButton color="dark" type-button="submit" :disabled="state.isLoading">
                                    Entrar
                                </BaseButton>
                            </form>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script lang="ts">
/**
 * Um Modal Factory que pode ser usado de acordo com a necessidade.
 * @version 1.0.0
 */
import useNotifier from '../../hooks/notifier'
import { TypeOfNotification } from '../../interfaces/INotification'
import { Actions } from '../../store/type-actions'
import BaseButton from '../BaseButton/index.vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PartModal',
    emits: ['close', 'open'],
    components: {
        BaseButton,
    },
    props: {
        /**
         * Define o tipo do modal a ser usado
         * @values create, login
         */
        typeModal: {
            type: String,
            default: 'create',
        },
        /**
         * Define se o modal está sendo exibido ou não.
         * @values true, false
         */
        open: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const store = useStore()
        const isActive = ref(true)
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const { notify } = useNotifier()

        /** Limpa os campos do modal e Notifica em caso de sucesso
         * @event success
         */
        const cleanAndNotify = (title: string, text: string) => {
            name.value = ''
            email.value = ''
            password.value = ''

            notify(TypeOfNotification.SUCESSO, title, text)
        }

        const createUser = () => {
            if (name.value != '' && email.value != '' && password.value != '') {
                store
                    .dispatch(Actions.REGISTER_USER, {
                        name: name.value,
                        email: email.value,
                        password: password.value,
                    })
                    .then(() => cleanAndNotify('Conta Registrada', 'Sua conta foi criada com sucesso, efetue login.'))
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
                .catch(() => {
                    notify(
                        TypeOfNotification.FALHA,
                        'Preencha todos os campos',
                        'Erro na tentativa de criar uma conta.'
                    )
                })
            //.then(() => cleanAndNotify('', 'Login efetuado com sucesso'))
        }

        /** Acionado quando o modal tiver o valor true.
         * @event open
         * @type {Event}
         */
        const showModal = (active: boolean) => {
            isActive.value = active
            emit('open', active)
        }

        /** Acionado quando o botão de fechar do modal for clicado.
         * @event open
         * @type {Event}
         */
        const closeModal = () => {
            emit('close')
        }
        return {
            isActive,
            name,
            email,
            password,
            createUser,
            loginUser,
            notify,
            showModal,
            closeModal,
        }
    },
})
</script>

<style lang="scss" scoped>
.modal {
    z-index: 2;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__button {
        transition: all 200ms ease;
        padding: 0.4rem;

        &:hover {
            background-color: gray;
            transform: rotate(-180deg);

            svg {
                fill: white;
            }
        }
    }
}
.overlay {
    z-index: 0;
}
</style>

<docs lang="md">
Modal que pode ser utilizado para login ou criação de conta de usuário.

## Exemplo

Modal de Login:

```vue
<PartModal typeModal="login" @open="true" />
```
</docs>
