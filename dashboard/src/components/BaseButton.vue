<template>
    <button class="base-button rounded-full font-bold" :class="classByType">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        typeButton: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const classByType: ComputedRef<string> = computed(() => {
            return props.typeButton === 'dark' ? 'base-button_dark' : 'base-button_light'
        })

        return {
            classByType,
        }
    },
})
</script>

<style lang="scss" scoped>
.base-button {
    padding: 7px 22px;
    max-width: 230px;

    &_dark {
        background-color: theme('colors.brand.main');
        color: theme('colors.brand.white');
    }

    &_light {
        background-color: theme('colors.brand.white');
        color: theme('colors.brand.main');
    }
}
</style>
