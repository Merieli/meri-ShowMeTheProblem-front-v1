<template>
    <div class="bg-brand-main w-full justify-center flex">
        <header class="geral-header justify-between items-center flex">
            <h1 class="geral-header__logo font-black"><a href="#">ShowMeTheProblem</a></h1>
            <nav class="geral-header__navigation">
                <button class="geral-header__link font-bold" @click="handleAccountCreate">Crie uma conta</button>
                <BaseButton @click="handleLogin"> Entrar </BaseButton>
            </nav>
        </header>
        <PartModal modalType="create" v-if="isShow" @close="isShow = false" />
        <PartModal modalType="login" v-if="isShow" @close="isShow = false" />
    </div>
</template>

<script lang="ts">
import BaseButton from '../components/BaseButton.vue'
import PartModal from '../components/Modal/index.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'GeralHeader',
    components: {
        BaseButton,
        PartModal,
    },
    setup() {
        const router = useRouter()

        const isShow = ref(false)

        onMounted(() => {
            const token = window.localStorage.getItem('token')

            if (token) {
                router.push({ name: 'Feedbacks' })
            }
        })

        const handleLogin = () => {
            isShow.value = true
        }

        function handleAccountCreate() {
            isShow.value = true
        }

        return {
            handleLogin,
            isShow,
            handleAccountCreate,
        }
    },
})
</script>

<style lang="scss" scoped>
.geral-header {
    height: 129px;
    padding: 1rem;
    width: 100%;
    max-width: 1080px;

    &__link {
        color: theme('colors.brand.white');
        padding-right: 2rem;
    }

    &__logo {
        color: theme('colors.brand.white');
    }
}
</style>
