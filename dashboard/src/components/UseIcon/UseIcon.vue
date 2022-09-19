<template>
    <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import IconLoading from './IconLoading.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        IconLoading,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
})
</script>
