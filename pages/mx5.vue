<template>
    <div class="container">
        <canvas id="myChart"></canvas>
        <input v-model="maxyear" type="text" name="maxyear" id="maxyear" placeholder="Max. Baujahr" />
        <input v-model="maxkm" type="text" name="maxkm" id="maxkm" placeholder="Max. Kilometer" />
        <button @click="showData = !showData">Show Data</button>
        <table class="greyGridTable" v-if="showData">
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
                    <td>Ø {{ median }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        components: {},

        data() {
            return {
                data: [],
                maxkm: 185000,
                maxyear: 2003,
                chart: undefined,
                showData: false
            };
        },

        mounted() {
            fetch('/api/mx5/all').then(async res => {
                let data = await res.json();
                this.data = data;

                data = data.sort((a, b) => {
                    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                });

                /** Find all dates */
                const dates = {};
                data.map(d => new Date(d.timestamp).toLocaleDateString()).forEach(dateString => {
                    if (!dates[dateString]) dates[dateString] = true;
                });

                /** Map data */
                let priceMedianData = Object.keys(dates).map(_ => []);
                Object.keys(dates).forEach((date, index) => {
                    data.forEach(dataPoint => {
                        if (new Date(dataPoint.timestamp).toLocaleDateString() === date) {
                            priceMedianData[index].push(dataPoint.price);
                        }
                    });
                });

                /** Make median */
                priceMedianData = priceMedianData.map(array => array.reduce((p, c) => (p += Number(c)), 0) / array.length);

                const labels = Object.keys(dates);

                const config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Mx-5 Price',
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                data: priceMedianData
                            }
                        ]
                    },
                    options: {}
                };

                this.chart = new Chart(document.getElementById('myChart'), config);
            });
        },
        updated() {
            let data = this.filteredData;

            data = data.sort((a, b) => {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            });

            /** Find all dates */
            const dates = {};
            data.map(d => new Date(d.timestamp).toLocaleDateString()).forEach(dateString => {
                if (!dates[dateString]) dates[dateString] = true;
            });

            /** Map data */
            let priceMedianData = Object.keys(dates).map(_ => []);
            Object.keys(dates).forEach((date, index) => {
                data.forEach(dataPoint => {
                    if (new Date(dataPoint.timestamp).toLocaleDateString() === date) {
                        priceMedianData[index].push(dataPoint.price);
                    }
                });
            });

            /** Make median */
            priceMedianData = priceMedianData.map(array => array.reduce((p, c) => (p += Number(c)), 0) / array.length);

            const labels = Object.keys(dates);

            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = priceMedianData;

            this.chart.update();
        },

        computed: {
            filteredData() {
                let baseData = [...this.data];
                if (this.maxkm && this.maxkm !== 0) {
                    baseData = baseData.filter(c => c.km <= Number(this.maxkm));
                }
                if (this.maxyear && this.maxyear !== 0) {
                    baseData = baseData.filter(c => c.age <= Number(this.maxyear));
                }
                return baseData;
            },
            median() {
                const data = this.filteredData;
                return data
                    .map(c => c.price)
                    .slice()
                    .sort((a, b) => a - b)[Math.floor(data.map(c => c.price).length / 2)];
            }
        },

        methods: {}
    });
</script>
<style>
    .container {
        margin: auto auto;
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
