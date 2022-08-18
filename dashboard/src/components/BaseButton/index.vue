<template>
    <button
        class="base-button rounded-full font-bold text-xl"
        :class="classByColor"
        :type="typeButton"
        data-button="base"
    >
        <!-- @slot texto para o botão -->
        <slot />
    </button>
</template>

<script lang="ts">
/**
 * Botão base que pode ser utilizado em qualquer parte do projeto.
 * @displayName Base Button
 * @author Merieli Manzano
 * @version 1.0.0
 */
import { ButtonColors, ButtonTypes, TColorsButton, TButton } from './module'
import { defineComponent, computed, ComputedRef, PropType } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        /**
         * Define a cor de **fundo** e de **fonte** do botão.
         * @values light, dark
         */
        color: {
            type: String as PropType<TColorsButton>,
            default: ButtonColors.LIGHT,
        },
        /**
         * Define se o botão é normal ou é um botão de formulário.
         * @values button, submit
         */
        typeButton: {
            type: String as PropType<TButton>,
            default: ButtonTypes.BUTTON,
        },
    },
    setup(props) {
        /**
         * Define a classe que será utilizada no botão de acordo com sua **color** definida.
         * @method classByColor
         * @type {computed}
         */
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
    border: none;
    border-radius: 5rem;

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

<docs lang="md">
Botão base que pode ser utilizado em qualquer parte do projeto.

## Exemplos

### Botão Dark:

```jsx
<BaseButton color="dark" type-button="submit">
    Efetuar login
</BaseButton>
```

Botão Light:

```jsx
<BaseButton color="light"> Teste </BaseButton>
```
</docs>
