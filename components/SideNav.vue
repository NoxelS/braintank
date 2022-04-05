<template>
    <div class="side-nav" :class="drawerOpen ? 'active' : ''">
        <div class="nav-icon" @click="drawerOpen = !drawerOpen">
            <menu-icon :size="35" :fillColor="drawerOpen ? '#fff' : '#333'" />
        </div>
        <div class="drawer">
            <h2>Braintank</h2>
            <div v-if="user" class="user">
                <img :src="user.picture" alt="" />
                <span>{{ user.name }}</span>
            </div>
            <a v-if="!isLoggedIn" href="/login" class="login">Login</a>
            <a v-if="isLoggedIn" href="/logout" class="login">Logout</a>
        </div>
    </div>
</template>

<script>
    import MenuIcon from 'vue-material-design-icons/Menu.vue';

    export default {
        name: 'SideNav',
        components: {
            MenuIcon
        },

        data() {
            return {
                user: null,
                isLoggedIn: false,
                drawerOpen: false
            };
        },
        mounted() {
            fetch('/api/user').then(async data => {
                this.user = await data.json();
                this.isLoggedIn = !!this.user;
            });
        },

        computed: {},

        methods: {}
    };
</script>

<style lang="scss">
    .side-nav {
        .drawer {
            display: none;
        }

        .nav-icon {
            padding-left: 16px;
            padding-top: 16px;
            cursor: pointer;
        }

        &.active {
            top: 0;
            left: 0;
            height: 100%;
            width: 200px;
            background: #333;

            .drawer {
                display: block;
                padding: 10px 20px;
                color: white;

                a {
                    color: white;
                }

                .user {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 25px;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 100%;
                    }
                    span {
                        margin-top: 8px;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
