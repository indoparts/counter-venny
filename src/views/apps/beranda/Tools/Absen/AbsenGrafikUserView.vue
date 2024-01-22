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
                data: []
            }, {
                name: 'Absensi Tidak Telat',
                data: []
            }],
        }
    },
    mounted() {
        this.grafikAbsen().then(res => {
            console.log(res);
            this.series[0].data = res.data.telat
            this.series[1].data = res.data.tidak_telat
            this.categories = res.data.label
        })
    },
    methods: {
        ...mapActions('absensi', ['grafikAbsen']),
        chartOptions() {
            var options = {
                chart: {
                    height: 350,
                    type: "bar",
                    stacked: false
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#FF1654", "#247BA0"],
                stroke: {
                    width: [4, 4]
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20%"
                    }
                },
                xaxis: {
                    categories: this.categories
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#FF1654"
                        },
                        labels: {
                            style: {
                                colors: "#FF1654"
                            }
                        },
                        title: {
                            text: "Absensi telat",
                            style: {
                                color: "#FF1654"
                            }
                        }
                    },
                    {
                        opposite: true,
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#247BA0"
                        },
                        labels: {
                            style: {
                                colors: "#247BA0"
                            }
                        },
                        title: {
                            text: "Absensi tidak telat",
                            style: {
                                color: "#247BA0"
                            }
                        }
                    }
                ],
                tooltip: {
                    theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 40
                }
            };
            return options
        },
    }
}
</script>