<template>
    <div id="app">
        <PartNotification />
        <router-view />
    </div>
</template>

<script lang="ts">
import PartNotification from './components/Notification/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: {
        PartNotification,
    },
})
</script>
