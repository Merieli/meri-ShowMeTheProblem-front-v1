<template>
    <div class="flex justify-between w-full my-5">
        <button
            @click="() => setFeedbackType('ISSUE')"
            type="button"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
        >
            <div class="w-12">
                <img src="../../assets/images/issue.png" alt="problema" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Problema</p>
        </button>
        <button
            @click="() => setFeedbackType('IDEA')"
            type="button"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
        >
            <div class="w-12">
                <img src="@/assets/images/idea.png" alt="problema" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Ideia</p>
        </button>
        <button
            @click="() => setFeedbackType('OTHER')"
            type="button"
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
        >
            <div class="w-12">
                <img src="@/assets/images/other.png" alt="problema" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Outro</p>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

interface SetupReturn {
    setFeedbackType(type: string): void;
}

export default defineComponent({
    setup(_, { emit }: SetupContext): SetupReturn {
        const setFeedbackType = (type: string): void => {
            emit('select-feedback-type', type);
            emit('next');
        };

        return {
            setFeedbackType,
        };
    },
});
</script>
