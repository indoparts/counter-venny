<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
        <v-card flat color="card" rounded v-if="$can(item.authorization)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle>{{ item.artist }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ml-2 mt-2" outlined rounded small :to="item.link">
                  periksa
                </v-btn>
              </v-card-actions>
            </div>
            <v-avatar color="bg" size="70" class="mt-5 mr-5">
              <v-icon class="ma-5" size="30" tile :color="item.color">
                {{ item.src }}
              </v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flat class="mt-5" color="card">
          <v-card-title>Jadwal Shift</v-card-title>
          <v-card-text>
            <JadwalKalender />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card flat class="mt-5" color="card">
      <v-card-title>Pengajuan Cuti</v-card-title>
      <v-card-text>
        <apexchart type="bar" :options="chartOptionsCuti()" :series="seriesCuti"></apexchart>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-title>Pengajuan Izin</v-card-title>
          <v-card-text>
            <apexchart type="donut" :options="donutsOptionsIzin()" :series="seriesIzin"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-title>Pengajuan Resign</v-card-title>
          <v-card-text>
            <apexchart type="area" :options="chartOptionsResign()" :series="seriesResign"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex"
import JadwalKalender from "./JadwalKalender.vue"
export default {
  components:{
    JadwalKalender
  },
  data() {
    return {
      items: [
        {
          color: 'primary',
          src: 'mdi-fingerprint',
          title: 'Absen',
          artist: 'Absen masuk/pulang',
          link: '/users-absen',
          authorization: 'read-absensi'
        },
        {
          color: 'error',
          src: 'mdi-plane-car',
          title: 'Form Cuti',
          artist: 'Permohonan Cuti',
          link: '/cuti/form-cuti',
          authorization: 'read-cuti'
        },
        {
          color: 'accent',
          src: 'mdi-email-variant',
          title: 'Form Izin',
          artist: 'Permohonan izin',
          link: '/izin/izin-form',
          authorization: 'read-izin'
        },
        {
          color: 'accent',
          src: 'mdi-wallet-travel',
          title: 'Info Gaji',
          artist: 'Periksa slip pendapatan',
          link: '/summary-gaji/selip-gaji',
          authorization: 'read-gaji'
        },
        {
          color: 'primary',
          src: 'mdi-cash-multiple',
          title: 'Kasbon',
          artist: 'Permohonan izin kasbon',
          link: '/',
          authorization: 'create-kasbon'
        },
        {
          color: 'error',
          src: 'mdi-exit-run',
          title: 'Resign',
          artist: 'Permohonan Resign',
          link: '/resign/form-resign',
          authorization: 'create-resign'
        },
      ],
      seriesIzin: [],
      labelsIzin: [],
      categoriesCuti: [4, 5],
      seriesCuti: [{
        name: 'Cuti Once',
        data: []
      }, {
        name: 'Cuti Range',
        data: []
      }],
      categoriesResign: [4, 5],
      seriesResign: [{
        name: 'User Resign',
        data: []
      }]
    }
  },
  mounted() {
    this.getDataFromApi()
  },
  methods: {
    ...mapActions("beranda", ['index']),
    getDataFromApi() {
      this.loading = true
      const tableAttr = { options: this.options, search: this.search }
      this.index(tableAttr).then(res => {
        // console.log(res.data.data);
        this.seriesCuti[0].data = res.data.data.cutichart.once
        this.seriesCuti[1].data = res.data.data.cutichart.range
        this.categoriesCuti = res.data.data.cutichart.label

        this.seriesResign[0].data = res.data.data.resign.val
        this.categoriesResign = res.data.data.resign.labelResign

        this.labelsIzin = res.data.data.izinchart.labelizin
        this.seriesIzin = res.data.data.izinchart.charts
        this.loading = false
      })
    },

    donutsOptionsIzin() {
      var optionsDonuts = {
        series: this.seriesIzin,
        labels: this.labelsIzin,
        legend: {
          labels: {
            colors: (this.$vuetify.theme.dark) ? '#ffffff' : '#000000',
            useSeriesColors: false
          },
        }
      };
      return optionsDonuts
    },

    chartOptionsCuti() {
      var options = {
        chart: {
          height: 350,
          type: "bar",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: [(this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549', (this.$vuetify.theme.dark) ? '#E879F9' : '#FD8A8A'],
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: this.categoriesCuti
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
            },
            labels: {
              style: {
                colors: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
              }
            },
            title: {
              text: "Cuti Once",
              style: {
                color: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
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
              color: (this.$vuetify.theme.dark) ? '#E879F9' : '#FD8A8A'
            },
            labels: {
              style: {
                colors: (this.$vuetify.theme.dark) ? '#E879F9' : '#FD8A8A'
              }
            },
            title: {
              text: "Cuti Range",
              style: {
                color: (this.$vuetify.theme.dark) ? '#E879F9' : '#FD8A8A'
              }
            }
          }
        ],
        tooltip: {
          theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        legend: {
          labels: {
            colors: (this.$vuetify.theme.dark) ? '#ffffff' : '#000000',
            useSeriesColors: false
          },
          horizontalAlign: "left",
          offsetX: 40
        }
      };
      return options
    },
    chartOptionsResign() {
      var options = {
        chart: {
          height: 350,
          type: "bar",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: [(this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549', (this.$vuetify.theme.dark) ? '#E879F9' : '#FD8A8A'],
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: this.categoriesResign
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
            },
            labels: {
              style: {
                colors: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
              }
            },
            title: {
              text: "User Resign",
              style: {
                color: (this.$vuetify.theme.dark) ? '#00DC82' : '#7f2549'
              }
            }
          },
        ],
        tooltip: {
          theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        legend: {
          labels: {
            colors: (this.$vuetify.theme.dark) ? '#ffffff' : '#000000',
            useSeriesColors: false
          },
          horizontalAlign: "left",
          offsetX: 40
        }
      };
      return options
    },
  },
}
</script>
