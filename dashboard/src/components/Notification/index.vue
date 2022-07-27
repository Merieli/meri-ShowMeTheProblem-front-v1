<template>
    <div class="notification bg-white w-80 h-40 bg-green-100 rounded-md">
        <div>
            <h6 class="notification__header text-lime-900 font-bold">Atenção</h6>
            <p class="notification__body text-lime-900 font-normal">Texto de notificação</p>
        </div>
    </div>
</template>

<script lang="ts">
import { TypeOfNotification } from '../../interfaces/INotification'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PartNotification',
    props: {
        showAlert: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const store = useStore()
        const classNotification = computed(() => ({
            'is-sucess': [TypeOfNotification.SUCESSO],
            'is-warning': [TypeOfNotification.ATENCAO],
            'is-danger': [TypeOfNotification.FALHA],
        }))

        return {
            classNotification,
            notification: computed(() => store.state.notifications),
        }
    },
})
</script>

<style scoped lang="scss">
.notification {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
    top: 0;
}
</style>
