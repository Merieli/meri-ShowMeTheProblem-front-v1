<template>
    <div id="app">
        <BaseNotification />
        <router-view />
    </div>
</template>

<script lang="ts">
import BaseNotification from './components/BaseNotification.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: {
        BaseNotification,
    },
})
</script>
