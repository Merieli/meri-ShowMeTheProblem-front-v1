<template>
    <ContentLoader class="flex flex-col items-center rounded" width="100%" height="300px">
        <ContentLoader class="mt-3 rounded" width="90%" height="50px" animation-duration="2s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="50px" animation-duration="2.3s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="50px" animation-duration="2.7s" />

        <ContentLoader class="mt-3 rounded" width="80%" height="50px" animation-duration="2.9s" />
    </ContentLoader>
</template>

<script lang="ts">
// import ContentLoader from '../ContentLoader'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FiltersLoading',
    // components: {
    //     ContentLoader,
    // },
    setup() {
        return
    },
})
</script>

<style></style>
