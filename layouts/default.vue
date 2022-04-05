<template>
    <div class="root">
        <side-nav></side-nav>
        <div class="main-content" :class="!isLoggedIn && !isLoading ? 'hint' : ''">
            <nuxt v-if="isLoggedIn && !isLoading" />
            <h1 v-if="!isLoggedIn && !isLoading" class="center">
                You need to sign in to continue!
            </h1>
            <h1 class="center" v-if="isLoading">
                Loading...
            </h1>
        </div>
    </div>
</template>
<script>
    import SideNav from '~/components/SideNav.vue';

    export default {
        name: 'default',
        components: {
            SideNav
        },

        data() {
            return {
                user: null,
                isLoggedIn: false,
                isLoading: true
            };
        },
        mounted() {
            fetch('/api/user')
                .then(async data => {
                    this.user = await data.json();
                    this.isLoggedIn = !!this.user;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        computed: {},

        methods: {}
    };
</script>

<style lang="scss">
    @import 'assets/css/const';
    .root {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 100vh;
        width: 100vw;
        overflow: auto;
        top: 0;
        left: 0;
        > .main-content {
            padding: 10px;
            width: 100%;
            display: flex;

            &.hint {
                background-image: url('~@/assets/hint.png');
                background-repeat: no-repeat;
            }
        }

        .center {
            width: max-content;
            margin: auto;
            align-self: center;
        }
    }
</style>
