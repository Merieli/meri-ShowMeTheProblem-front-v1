<template>
    <button
        class="base-button rounded-full font-bold text-xl"
        :class="classByColor"
        :type="typeButton"
        data-button="base"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { ButtonTypes, ITypeButton } from './module'
import { defineComponent, computed, ComputedRef, PropType } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        color: {
            type: String,
            default: 'light',
        },
        typeButton: {
            type: String as PropType<ITypeButton>,
            default: ButtonTypes.BUTTON,
        },
    },
    setup(props) {
        const classByColor: ComputedRef<string> = computed(() => {
            return props.color === 'dark' ? 'base-button_dark' : 'base-button_light'
        })

        return {
            classByColor,
        }
    },
})
</script>

<style lang="scss" scoped>
.base-button {
    padding: 7px 22px;
    max-width: 250px;

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
