<template>
    <div class="container">
        <div class="h2" v-if="allUsers.length > 0">
            We have some users! Want to see it?
            <a href="/users">Yes</a>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        components: {},

        data() {
            return {
                allUsers: []
            };
        },

        mounted() {
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
</style>
