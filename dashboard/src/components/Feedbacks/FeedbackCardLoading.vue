<template>
    <ContentLoader class="flex flex-col align-start p-8 items-center rounded" width="100%" height="250px">
        <ContentLoader class="mt-3 rounded" width="100%" height="40px" animation-duration="2s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.3s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="40px" animation-duration="2.7s" />

        <ContentLoader class="mt-3 rounded" width="50%" height="40px" animation-duration="2.9s" />
    </ContentLoader>
</template>

<script lang="ts">
import ContentLoader from '../ContentLoader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: { ContentLoader },
})
</script>
