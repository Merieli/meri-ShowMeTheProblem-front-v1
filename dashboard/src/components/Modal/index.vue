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
                    <slot name="content" />
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PartModal',
    props: {
        modalType: {
            type: String,
            required: true,
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const closeModal = () => {
            return emit('close')
        }
        return {
            closeModal,
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
