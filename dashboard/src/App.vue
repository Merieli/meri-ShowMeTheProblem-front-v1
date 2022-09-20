<template>
    <div id="app">
        <BaseNotification />
        <router-view />
    </div>
</template>

<script lang="ts">
import BaseNotification from './components/BaseNotification.vue'
import { defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'App',
    components: {
        BaseNotification,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        watch(
            () => route.path,
            async () => {
                if (route.meta.hasAuth) {
                    const token = window.localStorage.getItem('token')

                    if (!token) {
                        router.push({ name: 'home' })
                        return
                    }
                }
            }
        )
    },
})
</script>
