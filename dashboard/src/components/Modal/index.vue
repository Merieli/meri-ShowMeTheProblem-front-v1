<template>
    <teleport to="#test">
        <div
            class="overlay fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
            <div class="fixed mx-10">
                <div
                    class="modal w-96 flex flex-col overflow-hidden bg-white rounded-lg .animate__animated animate__faster animate__fadeInDown"
                >
                    <div class="modal__header mx-8 my-8">
                        <slot name="title" />
                        <button @click.prevent="closeModal" class="modal__button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path
                                    d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="modal__content">
                        <slot name="content" />
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PartModal',
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
