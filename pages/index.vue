<template>
    <div class="container">
        <div class="h2" v-if="!isLoggedIn">
            You are not logged in
        </div>
        <div class="h2" v-if="isLoggedIn">
            All users:
            <div class="info">
                <a class="user" target="_blank" v-for="u in allUsers" :key="u.nickname" :href="`https://www.linkedin.com/search/results/all/?keywords=${u.name}`">
                    <span>
                        {{ u.name }}
                    </span>
                    <img width="40px" height="40px" :src="u.picture" />
                </a>
            </div>
        </div>
        <div class="row">
            <a href="/login" v-if="!isLoggedIn" class="login">Login</a>
            <a href="/logout" v-if="isLoggedIn" class="logout">Logout</a>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        components: {},

        data() {
            return {
                user: null,
                isLoggedIn: false,
                allUsers: []
            };
        },

        mounted() {
            console.log('Mounted');
            fetch('/api/user').then(async data => {
                this.user = await data.json();
                this.isLoggedIn = !!this.user;
            });
            fetch('/api/user/all').then(async data => {
                this.allUsers = await data.json();
            });
        },

        computed: {},

        methods: {}
    });
</script>

<style>
    .container {
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .info {
        display: flex;
        flex-direction: column;
        width: 400px;
        justify-content: flex-start;
    }
    .info a {
        border-radius: 10px;
        margin-top: 10px;
        width: 250px;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.05);
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
    }

    .info img {
        border-radius: 100%;
    }
</style>
