<template>
    <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import IconCopy from './IconCopy.vue'
import IconLoading from './IconLoading.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        IconLoading,
        IconCopy,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
})
</script>
