<template>
    <teleport to="body">
        <div
            v-if="state.show"
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            @click="handleModalToogle({ status: false })"
        >
            <div class="fixed mx-10">
                <div
                    class="modal flex flex-col overflow-hidden bg-white rounded-lg .animate__animated animate__faster animate__fadeInDown"
                >
                    <div class="flex flex-col px-12 py-10 bg-white">
                        <label v-if="modalType === 'create'" for="">Nome</label>
                        <input v-if="modalType === 'create'" type="text" placeholder="Seu Nome Aqui" />
                        <label for="">E-mail</label>
                        <input type="email" placeholder="email@exemplo.com" />
                        <label for="">Senha</label>
                        <input type="password" placeholder="******" />
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { reactive } from 'vue'

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
    name: 'PartModal',
    setup() {
        const state = reactive({
            show: false,
            props: {
                modalType: {
                    type: String,
                    required: true,
                },
            },
            width: DEFAULT_WIDTH,
        })

        function handleModalToogle(status: boolean) {
            state.show = status
        }

        return {
            state,
            handleModalToogle,
        }
    },
}
</script>

<style lang="scss" scoped>
.modal {
}
</style>
