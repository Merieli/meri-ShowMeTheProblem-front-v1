<template>
    <div class="notification w-80 h-40 rounded-md">
        <div
            class="rounded-md p-4 m-4"
            v-for="notication in notifications"
            :key="notication.id"
            :class="classAlert[notication.type]"
        >
            <h6 class="notification__header font-bold">{{ notication.title }}</h6>
            <p class="notification__body font-normal">{{ notication.text }}</p>
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
    data() {
        return {
            classAlert: {
                [TypeOfNotification.SUCESSO]: 'notification__success',
                [TypeOfNotification.ATENCAO]: 'notification__warning',
                [TypeOfNotification.FALHA]: 'notification__danger',
            },
        }
    },
    setup() {
        const store = useStore()

        return {
            notifications: computed(() => store.state.notifications),
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

    &__success {
        background-color: rgb(247 254 231);
        color: rgb(77 124 15);
    }

    &__warning {
        color: rgb(234 88 12);
        background-color: rgb(255 237 213);
    }

    &__danger {
        color: rgb(220 38 38);
        background-color: rgb(254 226 226);
    }
}
</style>
