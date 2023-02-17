<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-card color="card" flat>
            <v-card-title>Grafik Data</v-card-title>
            <v-card-text>
                <v-card-text>
                    <apexchart :options="chartOptions()" :series="series"></apexchart>
                </v-card-text>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            categories: [],
            series: [{
                name: 'Absensi Telat',
                type: 'column',
                data: []
            }, {
                name: 'Absensi Tidak Telat',
                type: 'line',
                data: []
            }],
        }
    },
    mounted() {
        this.grafikAbsen().then(res => {
            this.series[0].data = res.data.telat
            this.series[1].data = res.data.tidak_telat
            this.categories = res.data.label
        })
    },
    methods: {
        ...mapActions('absensi', ['grafikAbsen']),
        chartOptions() {
            return {
                chart: {
                    foreColor: (this.$vuetify.theme.dark) ? '#ffffff' : '#00000',
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Traffic Absensi'
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: this.categories,
                tooltip: {
                    theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [{
                    title: {
                        text: 'Absensi Telat',
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Absensi Tidak Telat'
                    }
                }],
                grid: {
                    borderColor: (this.$vuetify.theme.dark) ? '#ffffff' : '#00000',
                    xaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
            }
        },
    }
}
</script>