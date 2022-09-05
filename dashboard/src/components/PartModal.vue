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
                                        class="bg-slate-50 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.name.errorMessage,
                                        }"
                                        type="text"
                                        name="name"
                                        placeholder="Seu Nome Aqui"
                                        v-model="state.name.value"
                                        autocomplete="on"
                                        required
                                        data-form-name
                                    />
                                    <span v-if="!!state.name.errorMessage" class="block font-medium text-brand-danger">
                                        {{ state.name.errorMessage }}
                                    </span>
                                    <label for="email" class="font-bold text-lg mt-6">E-mail</label>
                                    <input
                                        class="bg-slate-50 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.email.errorMessage,
                                        }"
                                        type="email"
                                        name="email"
                                        placeholder="email@exemplo.com"
                                        v-model="state.email.value"
                                        autocomplete="on"
                                        required
                                    />
                                    <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
                                        {{ state.email.errorMessage }}
                                    </span>
                                    <label for="password" class="font-bold text-lg mt-6">Senha</label>
                                    <input
                                        class="bg-slate-50 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.password.errorMessage,
                                        }"
                                        type="password"
                                        name="password"
                                        placeholder="******"
                                        v-model="state.password.value"
                                        required
                                    />
                                    <span
                                        v-if="!!state.password.errorMessage"
                                        class="block font-medium text-brand-danger"
                                    >
                                        {{ state.password.errorMessage }}
                                    </span>
                                </fieldset>

                                <BaseButton
                                    data-button="createAccount"
                                    color="dark"
                                    type-button="submit"
                                    :disabled="isLoading"
                                    class="mt-6"
                                    :class="{
                                        'opacity-50': isLoading,
                                    }"
                                >
                                    Criar conta
                                </BaseButton>
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
                                        class="bg-slate-50 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.email.errorMessage,
                                        }"
                                        type="email"
                                        name="email"
                                        placeholder="email@exemplo.com"
                                        v-model="state.email.value"
                                        autocomplete="on"
                                        required
                                    />
                                    <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
                                        {{ state.email.errorMessage }}
                                    </span>
                                    <label for="password" class="font-bold text-lg mt-6">Senha</label>
                                    <input
                                        class="bg-slate-50 p-3 text-lg border-2 border-transparent rounded"
                                        :class="{
                                            'border-brand-danger': !!state.password.errorMessage,
                                        }"
                                        type="password"
                                        name="password"
                                        placeholder="******"
                                        v-model="state.password.value"
                                        required
                                    />
                                    <span
                                        v-if="!!state.password.errorMessage"
                                        class="block font-medium text-brand-danger"
                                    >
                                        {{ state.password.errorMessage }}
                                    </span>
                                </fieldset>

                                <BaseButton color="dark" type-button="submit" :disabled="isLoading" class="mt-6">
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
/** @version 1.0.0
 */
import { IAccount } from '../interfaces'
import { useStore } from '../store'
import { Actions } from '../store/type-actions'
import { validateEmptyAndLenght6, validateEmptyAndEmail } from '../utils/validators'
import BaseButton from './BaseButton/index.vue'
import { useField } from 'vee-validate'
import { defineComponent, computed, reactive, ref } from 'vue'
import * as yup from 'yup'

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

        const { value: nameValue, errorMessage: nameErrorMessage } = useField<string>(
            'name',
            yup.string().required().min(6)
        )

        const { errorMessage: emailErrorMessage, value: emailValue } = useField<string>('email', validateEmptyAndEmail)

        const { errorMessage: passwordErrorMessage, value: passwordValue } = useField<string>(
            'password',
            validateEmptyAndLenght6
        )

        const state: IAccount = reactive({
            name: {
                value: nameValue,
                errorMessage: nameErrorMessage,
            },
            email: {
                value: emailValue,
                errorMessage: emailErrorMessage,
            },
            password: {
                value: passwordValue,
                errorMessage: passwordErrorMessage,
            },
        })

        /** Acionado quando o modal tiver o valor true.
         * @event open
         * @type {Event}
         */
        const showModal = (active: boolean) => {
            isActive.value = active
            emit('open', active)
        }

        /** Acionado para fechar o modal.
         * @event open
         * @type {Event}
         */
        const closeModal = () => {
            emit('close')
        }

        /** Limpa os campos do modal
         * @event success
         */
        const cleanAll = () => {
            state.name.value = ''
            // state.name.errorMessage = ''

            state.email.value = ''
            // state.email.errorMessage = ''

            state.password.value = ''
            // state.password.errorMessage =
        }

        const createUser = () => {
            store
                .dispatch(Actions.REGISTER_USER, {
                    name: state.name.value,
                    email: state.email.value,
                    password: state.password.value,
                })
                .then(() => {
                    cleanAll()
                    closeModal()
                })
        }

        const loginUser = () => {
            store
                .dispatch(Actions.LOGIN_USER, {
                    email: state.email.value,
                    password: state.password.value,
                })
                .then(() => {
                    cleanAll()
                    closeModal()
                })
        }

        return {
            state,
            isActive,
            isLoading: computed(() => store.state.isLoading),
            createUser,
            loginUser,
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
