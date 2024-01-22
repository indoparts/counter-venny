/* eslint-disable vue/multi-word-component-names */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueApexCharts from 'vue-apexcharts'
import VueFullscreen from 'vue-fullscreen'
import * as VueGoogleMaps from "vue2-google-maps"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueApexCharts)
Vue.use(VueFullscreen)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)
Vue.use(VueSweetalert2);
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.GMAP_API_TOKEN,
        libraries: "places"
    }
});
const url = `https://${process.env.BASE_URL_API}`
const SocketInstance = socketio.connect(url)
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance,
}))

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                bg: '#fdfbf8',
                appbar: '#fdfbf8',
                drawer: '#7f2549',
                rightdrawer: '#fdfbf8',
                footer: '#fdfbf8',
                card: '#fdf6f0',
                primary: '#7f2549',
                secondary: '#F1F7B5',
                accent: '#A8D1D1',
                error: '#F44336',
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
                error: '#E91E63',
            },
        },
    },
});
