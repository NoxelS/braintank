<template>
    <div class="container">
        <div class="h2" v-if="!isLoggedIn">
            You are not logged in
        </div>
        <div class="h2" v-if="isLoggedIn">
            Hello {{ user.name }}
            <div class="info">
                <span>The following info I gathered:</span>
                <span>Email: {{ user.email }}</span>
                <span>Verified Email: {{ user.email_verified }}</span>
                <span>family_name: {{ user.family_name }}</span>
                <span>given_name: {{ user.given_name }}</span>
                <span>name: {{ user.name }}</span>
                <span>nickname: {{ user.nickname }}</span>
                <span>picture: <img width="60px" height="60px" :src="user.picture" /></span>
                <span>sub: {{ user.sub }}</span>
                <span>updated_at: {{ user.updated_at }}</span>
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
                isLoggedIn: false
            };
        },

        mounted() {
            console.log('Mounted');
            fetch('/api/user').then(async data => {
                this.user = await data.json();
                this.isLoggedIn = !!this.user;
                console.log(this.user);
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
</style>
