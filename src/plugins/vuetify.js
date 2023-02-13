import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueApexCharts from 'vue-apexcharts'
import VueFullscreen from 'vue-fullscreen'

Vue.use(VueApexCharts)
Vue.use(VueFullscreen)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                bg: '#eff2f7',
                appbar: '#ffffff',
                drawer: '#002028',
                rightdrawer: '#eff2f7',
                footer: '#f2f2f5',
                card: '#ffffff',
                primary: '#4f46e5',
                secondary: '#22c55e',
                accent: '#f59e0b',
                error: '#ff3d32',
            },
            dark: {
                card: '#00303C',
                appbar: '#002028',
                drawer: '#002028',
                rightdrawer: '#002028',
                footer: '#002028',
                bg: '#002028',
                primary: '#00DC82',
                secondary: '#255461',
                accent: '#BEF264',
                error: '#E879F9',
            },
        },
    },
});
