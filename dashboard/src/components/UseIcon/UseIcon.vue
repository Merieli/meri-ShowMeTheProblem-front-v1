<template>
    <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import IconChevron from './IconChevron.vue'
import IconCopy from './IconCopy.vue'
import IconLoading from './IconLoading.vue'
import { defineComponent, PropType } from 'vue'

export type IconsName = 'IconLoading' | 'IconCopy' | 'IconChevron'

/**
 * Componente para utilização dos ícones configurados no projeto.
 * <br/><br/>
 * Para adicionar um novo ícone, este deve possuir seu próprio componente Vue com o SVG a ser utilizado.
 * Por exemplo: no mesmo padrão do **IconCopy**.
 */
export default defineComponent({
    components: {
        IconLoading,
        IconCopy,
        IconChevron,
    },
    props: {
        name: {
            type: String as PropType<IconsName>,
            required: true,
        },
    },
})
</script>

<docs lang="md">
### 📲 Exemplos de uso

Icone de cópia:

```vue
<UseIcon name="IconCopy" color="#A9A9A9" size="24" />
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
