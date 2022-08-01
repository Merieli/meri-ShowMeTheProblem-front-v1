<template>
    <div class="home">
        <GeralHeader />
        <section class="home__presentation">
            <div class="home__content flex flex-col mt-28">
                <h2 class="home__title home__title_light">
                    Tenha um feedback. <br class="hidden lg:inline-block" />
                    E faça seus clientes mais felizes!
                </h2>
                <p class="home__text home__text_light">
                    Receba ideias, reclamações e feedbacks com um simples widget na página.
                </p>
                <BaseButton color="light"> Crie uma conta grátis </BaseButton>
            </div>
        </section>
        <section class="home__contact">
            <h3 class="home__title home__title_dark">Alguma dúvida?</h3>
            <p class="home__text">Quer saber melhor como funciona e quais são os preços?</p>
            <BaseButton color="dark">
                <a href="mailto:merieli.dev@gmail.com">Nos mande um e-mail</a>
            </BaseButton>
        </section>
        <footer class="home__footer">
            <p class="home__text">ShowMeTheProblem © 2022</p>
        </footer>
    </div>
</template>

<script lang="ts">
import BaseButton from '../../components/BaseButton/index.vue'
import GeralHeader from '../../components/GeralHeader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PageHome',
    components: {
        GeralHeader,
        BaseButton,
    },
})
</script>

<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        font-size: theme('fontSize.4xl');
        font-family: theme('fontFamily.black');
        line-height: 1.1;

        &_light {
            color: theme('colors.brand.white');
        }

        &_dark {
            color: theme('colors.brand.black');
        }
    }

    &__text {
        color: theme('colors.brand.black');
        font-size: theme('fontSize.xl');
        font-family: theme('fontFamily.regular');
        padding-bottom: 2.5rem;

        &_light {
            color: theme('colors.brand.white');
        }

        &_dark {
            color: theme('colors.brand.black');
        }
    }

    &__presentation {
        background-color: theme('colors.brand.main');
        display: flex;
        justify-content: center;
        width: 100%;
    }

    &__content {
        padding: 1rem;
        width: 100%;
        min-height: 500px;
        max-width: 1080px;
        background-size: contain;
        background-position: right 10% bottom 0%;
        background-image: url('../../assets/images/blue-balloons.png');
        background-repeat: no-repeat;
    }

    &__contact {
        text-align: center;
        padding: 4rem;
        max-width: 1080px;
    }

    &__footer {
        text-align: center;
        padding: 2.5rem;
        background-color: theme('colors.brand.gray');
        width: 100%;

        .home__text {
            padding: 0;
            font-family: theme('fontFamily.bold');
        }
    }
}
</style>
