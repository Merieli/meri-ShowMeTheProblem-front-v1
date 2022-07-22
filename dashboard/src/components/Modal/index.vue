<template>
    <teleport to="body">
        <div
            class="overlay fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            @click="closeModal"
        >
            <div class="fixed mx-10">
                <div
                    class="modal flex flex-col overflow-hidden bg-white rounded-lg .animate__animated animate__faster animate__fadeInDown"
                >
                    <div class="flex flex-col px-12 py-10 bg-white">
                        <label for="">Nome</label>
                        <input type="text" placeholder="Seu Nome Aqui" />
                        <label for="">E-mail</label>
                        <input type="email" placeholder="email@exemplo.com" />
                        <br />
                        <label for="">Senha</label>
                        <input type="password" placeholder="******" />
                        <BaseButton typeButton="dark">Create Account</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import BaseButton from '../BaseButton.vue'
import { defineComponent, reactive } from 'vue'

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default defineComponent({
    name: 'PartModal',
    components: {
        BaseButton,
    },
    emits: ['close'],
    setup(props, { emit }) {
        const state = reactive({
            props: {
                modalType: {
                    type: String,
                    required: true,
                },
            },
            width: DEFAULT_WIDTH,
        })

        const closeModal = () => {
            return emit('close')
        }
        return {
            state,
            closeModal,
        }
    },
})
</script>

<style lang="scss" scoped>
.modal {
    z-index: 1;
}
.overlay {
    z-index: 0;
}
</style>
