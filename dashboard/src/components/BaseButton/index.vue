<template>
    <button
        class="base-button rounded-full font-bold text-xl transition-all duration-150"
        :class="classByColor"
        :type="typeButton"
        data-button="base"
        :disabled="isDisabled"
    >
        <!-- @slot Texto de conteúdo do botão -->
        <slot />
    </button>
</template>

<script lang="ts">
import { ButtonTypes, TColorsButton, TButton } from './module';
import { defineComponent, computed, ComputedRef, PropType } from 'vue';

export default defineComponent({
    name: 'BaseButton',
    props: {
        /**
         * Define a cor de **fundo** e de **fonte** do botão.
         * @values light, dark
         */
        color: {
            type: String as PropType<TColorsButton>,
            default: 'light',
        },
        /**
         * Define se o botão é normal ou é um botão de formulário.
         * @values button, submit
         */
        typeButton: {
            type: String as PropType<TButton>,
            default: ButtonTypes.BUTTON,
        },
        /**
         * Define se o botão está desabilitado ou não.
         * @values true, false
         */
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        /**
         * Define a classe que será utilizada no botão de acordo com sua **color** definida.
         * @method classByColor
         * @type {computed}
         */
        const classByColor: ComputedRef<string> = computed(() => {
            return props.color === 'dark'
                ? 'base-button_dark'
                : props.color === 'light'
                ? 'base-button_light'
                : 'base-button_dark';
        });

        return {
            classByColor,
        };
    },
});
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

#### 📲 **_Exemplos de uso_**

**Botão Dark:**

```jsx
<BaseButton color="dark" type-button="submit">
    Efetuar login
</BaseButton>
```

**Botão Light:**

```js { "className": "checks" }
<BaseButton color="light">Entrar</BaseButton>
```
</docs>
