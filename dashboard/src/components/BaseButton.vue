<template>
    <button class="base-button rounded-full font-bold" :class="classByType" :type="typeButton">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        color: {
            type: String,
            required: true,
        },
        typeButton: {
            type: String,
            default: 'button',
        },
    },
    setup(props) {
        const classByType: ComputedRef<string> = computed(() => {
            return props.color === 'dark' ? 'base-button_dark' : 'base-button_light'
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
