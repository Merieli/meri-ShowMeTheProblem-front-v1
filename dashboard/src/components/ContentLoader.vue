<template>
    <div
        :style="{
            width,
            height,
        }"
        class="content-loader opacity-75"
    >
        <span :style="{ animationDuration }" class="content-loader__fx"></span>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ContentLoader',
    props: {
        maxWidth: {
            default: 100,
            type: Number,
        },
        minWidth: {
            default: 80,
            type: Number,
        },
        animationDuration: {
            default: '1.6s',
            type: String,
        },
        height: {
            default: '1rem',
            type: String,
        },
        width: {
            default: '1rem',
            type: String,
        },
    },
});
</script>

<style lang="scss" scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.content-loader {
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    background-color: #f6f7f8;

    &__fx {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(-100%);
        background-color: #f6f7f8;
        background-image: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 72%);
        background-position: 0 0;
        background-size: 1000 100;
        animation: shimmer infinite alternate ease-in-out;
    }
}
</style>
