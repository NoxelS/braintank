<template>
    <div class="container">
        <div class="h2" v-if="allUsers.length > 0">
            <table class="greyGridTable">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Name</th>
                        <th>Nickname</th>
                        <th>Picture</th>
                        <th>Locale</th>
                        <th>Email</th>
                        <th>Verified?</th>
                        <th>Auth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in allUsers" :key="user.nickname">
                        <td>{{user.given_name}}</td>
                        <td>{{user.family_name}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.nickname}}</td>
                        <td><img :src="user.picture" width="50px" height="50px" alt=""></td>
                        <td>{{user.locale}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.email_verified}}</td>
                        <td>{{user.sub ? user.sub.split('|')[0] : 'n/a'}}</td>
                    </tr>
                </tbody>
            </table>
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

    table.greyGridTable {
        width: 100%;
        height: 200px;
        text-align: left;
        border-collapse: collapse;
    }
    table.greyGridTable td,
    table.greyGridTable th {
        border: 1px solid #ffffff;
        padding: 3px 4px;
        min-width: 100px;
        text-align: center;
    }
    table.greyGridTable tbody td {
        font-size: 13px;
    }
    table.greyGridTable td:nth-child(even) {
        background: #ebebeb;
    }
    table.greyGridTable thead {
        background: #ffffff;
        border-bottom: 4px solid #333333;
    }
    table.greyGridTable thead th {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        text-align: center;
        border-left: 2px solid #333333;
    }
    table.greyGridTable thead th:first-child {
        border-left: none;
    }

    table.greyGridTable tfoot {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        border-top: 4px solid #333333;
    }
    table.greyGridTable tfoot td {
        font-size: 14px;
    }
</style>
