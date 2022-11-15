<template>
    <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import IconChevron from './IconChevron.vue';
import IconChat from './IconChat.vue';
import IconLoading from './IconLoading.vue';
import IconBack from './IconBack.vue';
import IconClose from './IconClose.vue';
import IconSuccess from './IconSuccess.vue';
import IconError from './IconError.vue';
import { defineComponent, PropType } from 'vue';

export type IconsName =
    | 'IconLoading'
    | 'IconChat'
    | 'IconChevron'
    | 'IconBack'
    | 'IconClose'
    | 'IconSuccess'
    | 'IconError';

/**
 * Componente para utilização dos ícones configurados no projeto.
 * <br/><br/>
 * Para adicionar um novo ícone, este deve possuir seu próprio componente Vue com o SVG a ser utilizado.
 * Por exemplo: no mesmo padrão do **IconChat**.
 */
export default defineComponent({
    components: {
        IconLoading,
        IconChat,
        IconChevron,
        IconBack,
        IconClose,
        IconSuccess,
        IconError,
    },
    props: {
        name: {
            type: String as PropType<IconsName>,
            required: true,
        },
    },
});
</script>

<docs lang="md">
#### 📲 **_Exemplos de uso_**

Icone de cópia:

```vue
<UseIcon name="IconChat" color="#A9A9A9" size="24" />
```

Icone de carregamento:

```vue
<UseIcon name="IconLoading" color="#A9A9A9" size="24" />
```

Icone seta de ver mais:

```vue
<UseIcon name="IconChevron" color="#A9A9A9" size="24" />
```
</docs>
