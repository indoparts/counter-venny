<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
      <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
    </div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
        <v-card flat color="card" rounded>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-text="item.title"></v-card-title>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              <v-card-actions>
                <v-btn class="ml-2 mt-2" outlined rounded small>
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
    <v-card flat class="mt-5" color="card">
      <v-card-text>
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="donut" :options="optionsDonuts" :series="optionsDonuts.series"></apexchart>
          </v-card-text>
        </v-card>
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="area" :options="options" :series="series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat class="mt-5" color="card">
          <v-card-text>
            <apexchart type="line" :options="options" :series="series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      items: [
        {
          color: 'primary',
          src: 'mdi-fingerprint',
          title: 'Absen',
          artist: 'Absen masuk/pulang',
        },
        {
          color: 'error',
          src: 'mdi-plane-car',
          title: 'Cuti',
          artist: 'Permohonan Cuti',
        },
        {
          color: 'accent',
          src: 'mdi-hospital-box',
          title: 'Sakit',
          artist: 'Permohonan izin sakit',
        },
        {
          color: 'error',
          src: 'mdi-ghost',
          title: 'Izin',
          artist: 'Permohonan izin pribadi',
        },
        {
          color: 'accent',
          src: 'mdi-wallet-giftcard',
          title: 'Gaji',
          artist: 'Periksa slip pendapatan',
        },
        {
          color: 'primary',
          src: 'mdi-cash-multiple',
          title: 'Kasbon',
          artist: 'Permohonan izin kasbon',
        },
      ],
      optionsDonuts: {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      },
      options: {
        chart: {
          foreColor: '#ccc',
          toolbar: {
            show: false
          },
        },
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          theme: (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        grid: {
          borderColor: "#535A6C",
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
}
</script>
