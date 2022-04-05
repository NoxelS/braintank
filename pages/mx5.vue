<template>
    <div class="container">
        <input v-model="maxyear" type="text" name="maxyear" id="maxyear" placeholder="Max. year">
        <input v-model="maxkm" type="text" name="maxkm" id="maxkm" placeholder="Max. km">

        <table class="greyGridTable">
            <thead>
                <tr>
                    <th>Km</th>
                    <th>Age</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="car in filteredData" :key="car.id">
                    <td>{{ car.km }}</td>
                    <td>{{ car.age }}</td>
                    <td>{{ car.price }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Ø {{median}}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        components: {},

        data() {
            return {
                data: [],
                maxkm: undefined,
                maxyear: undefined,
            };
        },

        mounted() {
            fetch('/api/mx5/all').then(async res => {
                const data = await res.json();
                this.data = data;
            });
        },

        computed: {
            filteredData() {
                let baseData: any = [...this.data];
                if(this.maxkm && this.maxkm !== 0) {
                    console.log(Number(this.maxkm));
                    baseData = baseData.filter((c: any) => c.km <= Number(this.maxkm));
                }
                if(this.maxyear && this.maxyear !== 0) {
                    console.log(Number(this.maxyear));
                    baseData = baseData.filter((c: any) => c.age <= Number(this.maxyear));
                }
                return baseData;
            },
            median() {
                const data = (this as any).filteredData;
                return data.map(c => c.price).slice().sort((a, b) => a - b)[Math.floor(data.map(c => c.price).length / 2)];
            }
        },

        methods: {}
    });
</script>
<style>
    .container {
        margin: 0 auto;
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