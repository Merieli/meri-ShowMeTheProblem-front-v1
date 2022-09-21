<template>
    <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import IconChevron from './IconChevron.vue'
import IconCopy from './IconCopy.vue'
import IconLoading from './IconLoading.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        IconLoading,
        IconCopy,
        IconChevron,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
    },
})
</script>
