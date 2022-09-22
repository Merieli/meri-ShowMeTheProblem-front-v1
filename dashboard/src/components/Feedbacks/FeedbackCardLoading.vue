<template>
    <ContentLoader
        class="flex flex-col align-start p-8 items-start rounded"
        width="100%"
        :height="less ? '150px' : '250px'"
    >
        <ContentLoader class="mt-3 rounded" width="100%" height="40px" animation-duration="2s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.3s" />

        <ContentLoader v-if="!less" class="mt-3 rounded" width="80%" height="40px" animation-duration="2.7s" />

        <ContentLoader v-if="!less" class="mt-3 rounded" width="50%" height="40px" animation-duration="2.9s" />
    </ContentLoader>
</template>

<script lang="ts">
import ContentLoader from '../ContentLoader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: { ContentLoader },
    props: {
        less: {
            type: Boolean,
            default: false,
        },
    },
})
</script>
