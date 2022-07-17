<template>
    <div class="feedbacks">
        <GeralHeader />
        <section class="feedbacks__info font-black text-brand-black">
            <h2>Feedbacks</h2>
            <p>Detalhes de todos os feedbacks recebidos.</p>
        </section>
        <div class="feedbacks__all">
            <aside class="feedbacks__listing">
                <h4>Listagem</h4>
                <ul class="feedbacks__filters">
                    <li class="feedbacks__filter">Todos</li>
                    <li class="feedbacks__filter">Problemas</li>
                    <li class="feedbacks__filter">Ideias</li>
                    <li class="feedbacks__filter">Outros</li>
                </ul>
            </aside>
            <section class="feedbacks__cards">
                <ul class="feedbacks__received">
                    <li class="feedbacks__item">
                        <div>Problema</div>
                        <div>20 segundos atrás</div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div>PÁGINA</div>
                        <div>https://feedbacker.com/ajuda</div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import GeralHeader from '../../components/GeralHeader.vue'

export default {
    components: { GeralHeader },
    name: 'PageFeedbacks',
}
</script>

<style lang="scss" scoped>
.feedbacks {
    &__info {
        background-color: theme('colors.brand.gray');
        text-align: center;
        padding: 6.43rem;
    }
    &__all {
        display: flex;
    }

    &__listing {
        width: 300px;
        height: 100%;
    }
}
</style>
