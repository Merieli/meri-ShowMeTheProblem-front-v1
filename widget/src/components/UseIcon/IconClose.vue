<template>
    <svg :width="size" :height="size" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
            :fill="color"
        />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Icone de seta.
 * @displayName IconClose [Componente do UseIcon]
 */
export default defineComponent({
    name: 'IconClose',
    props: {
        size: {
            type: [String, Number],
            default: 22,
        },
        color: {
            type: String,
            default: 'white',
        },
    },
});
</script>
