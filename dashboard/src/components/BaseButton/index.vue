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
import { ButtonColors, ButtonTypes, TColorsButton, TButton } from './module'
import { defineComponent, computed, ComputedRef, PropType } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        color: {
            type: String as PropType<TColorsButton>,
            default: ButtonColors.LIGHT,
        },
        typeButton: {
            type: String as PropType<TButton>,
            default: ButtonTypes.BUTTON,
        },
    },
    setup(props) {
        const classByColor: ComputedRef<string> = computed(() => {
            return props.color === ButtonColors.DARK
                ? 'base-button_dark'
                : ButtonColors.LIGHT
                ? 'base-button_light'
                : 'base-button_dark'
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
