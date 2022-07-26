<template>
    <div class="notification bg-white w-80 h-80">
        <div :class="classNotification[notication.tipo]">
            <p class="notification__header">
                {{ notification.titulo }}
            </p>
            <p class="notification__body">
                {{ notication.texto }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { TypeOfNotification } from '../../interfaces/INotification'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PartNotification',
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
}
</style>
