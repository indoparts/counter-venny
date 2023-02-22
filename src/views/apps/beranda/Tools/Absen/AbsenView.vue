<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <v-card color="card" flat>
            <v-card-text>
                <GmapMap :center="center" :zoom="18" map-style-id="roadmap" :options="mapOptions"
                    style="width:100%;  height: 600px;" ref="mapRef" @click="handleMapClick">
                    <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag"
                        @click="panToMarker" />
                </GmapMap>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <form-absensi :lat="marker.position.lat" :lng="marker.position.lng"
                    :enable="enableAbsen"></form-absensi>
            </v-card-actions>
            <v-card-actions>
                <v-container>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <tr>
                                <th class="text-left">
                                    Nama Toko
                                </th>
                                <td class="text-left"> : {{ lokasiAbsen.nama }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">
                                    Alamat Toko
                                </th>
                                <td class="text-left"> : {{ lokasiAbsen.alamat }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">
                                    Telepon Toko
                                </th>
                                <td class="text-left"> : {{ lokasiAbsen.telepon }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">
                                    Kordinat Toko
                                </th>
                                <td class="text-left"> : {{ lokasiAbsen.latitude }}, {{ lokasiAbsen.longitude }}</td>
                            </tr>
                            <tr>
                                <th class="text-left">
                                    Radius Absen Toko
                                </th>
                                <td class="text-left"> : {{ lokasiAbsen.radius_forabsen }}</td>
                            </tr>
                        </template>
                    </v-simple-table>
                </v-container>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
 
<script>
import { mapState } from "vuex";
import FormAbsensi from '../components/FormAbsensi.vue'
export default {
    name: "AddGoogleMap",
    components: {
        FormAbsensi
    },
    data() {
        return {
            marker: { position: { lat: 10, lng: 10 }, animation: Animation.BOUNCE },
            center: { lat: 10, lng: 10 }, mapOptions: {
                disableDefaultUI: true,
            },
            lokasiAbsen: {},
            enableAbsen: false
        };
    },

    computed: {
        ...mapState('auth', {
            authenticated: state => state.authenticated,
        }),
    },
    watch: {
        authenticated(v) {
            this.lokasiAbsen = v.toko
            this.geolocate(v.toko.latitude, v.toko.longitude);
        }
    },

    methods: {
        geolocate(lt, lg) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.marker.position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.panToMarker();
                this.hitung({
                    lat: parseFloat(lt),
                    lng: parseFloat(lg),
                }, {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            });
        },

        handleMarkerDrag(e) {
            this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        },

        panToMarker() {
            this.$refs.mapRef.panTo(this.marker.position);
        },

        handleMapClick(e) {
            this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            console.log(e);
        },

        hitung(mk1, mk2) {
            var R = parseInt(this.lokasiAbsen.radius_forabsen);
            var rlat1 = mk1.lat * (Math.PI / 180);
            var rlat2 = mk2.lat * (Math.PI / 180);
            var difflat = rlat2 - rlat1;
            var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180);
            var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
            var hasil = d.toFixed(2)
            this.enableAbsen = hasil <= this.lokasiAbsen.radius ? true : false
        }
    }
};
</script>