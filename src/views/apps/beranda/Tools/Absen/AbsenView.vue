<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h3 class="font-weight-bold mt-3" v-text="$route.meta.title"></h3>
            <v-breadcrumbs :items="$route.meta.breadscrum"></v-breadcrumbs>
        </div>
        <GmapMap :center="center" :zoom="15" map-style-id="roadmap" :options="mapOptions"
            style="width:100%;  height: 600px;" ref="mapRef" @click="handleMapClick">
            <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag"
                @click="panToMarker" />
            <GmapMarker :position="marker2.position" :clickable="true" :draggable="true" @drag="handleMarkerDrag"
                @click="panToMarker" />
        </GmapMap>
        <v-card color="card" flat class="mt-3">
            <v-toolbar collapse flat dense color="card">
                <v-btn icon @click="loadMap">
                    <v-icon>mdi-reload</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-actions class="d-flex justify-center">
                <form-absensi :lat="marker.position.lat" :lng="marker.position.lng" :enable="enableAbsen"></form-absensi>
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
import { mapActions } from "vuex";
import FormAbsensi from '../components/FormAbsensi.vue'
import haversine from 'haversine-distance'
export default {
    name: "AddGoogleMap",
    components: {
        FormAbsensi
    },
    data() {
        return {
            marker: { position: { lat: 10, lng: 10 }, animation: Animation.BOUNCE },
            marker2: { position: { lat: 10, lng: 10 }, animation: Animation.BOUNCE },
            center: { lat: 10, lng: 10 }, mapOptions: {
                disableDefaultUI: true,
            },
            lokasiAbsen: {},
            enableAbsen: false
        };
    },
    mounted() {
        this.getUserLogin().then((res) => {
            const v = res.data.data.user
            let currentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
            const calculate = parseInt(this.diffTime(currentTime, v.jadwal.jam_mulai))
            if (calculate <= -60) {
                this.$swal({
                    title: 'Anda sudah terlambat melebihi 1 jam!',
                    icon: 'error',
                    text: 'Untuk dapat tetap melakukan absen silahkan anda membuat form izin terlambat, dan meminta administrator untuk membuatkan absensi secara manual, dan tolong untuk tidak mengulanginya demi kenyamanan anda!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'izin.add' })
                    }
                })
            }else{
                if (v.work_location_detail === undefined) {
                    this.$swal({
                        title: 'Terjadi kesalahan saat mendeteksi kantor anda!',
                        icon: 'error',
                        text: 'Periksa data lokasi kantor anda pada sistem karena kami tidak dapat menemukan data lokasi kantor anda, silakan hubungi administrator.',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push({ name: 'dashboard' })
                        }
                    })
                } else {
                    this.lokasiAbsen = v.work_location_detail
                    this.geolocate(v.work_location_detail.latitude, v.work_location_detail.longitude);
                }
            }
        })
    },
    methods: {
        ...mapActions('auth', ['getUserLogin']),
        geolocate(lt, lg) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.marker.position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.marker2.position = {
                    lat: parseFloat(lt),
                    lng: parseFloat(lg),
                };
                this.panToMarker();
                const calculate = this.haversine_distance({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }, {
                    latitude: parseFloat(lt),
                    longitude: parseFloat(lg),
                })
                const x = calculate >= parseFloat(this.lokasiAbsen.radius_forabsen) ? true : false
                console.log(Math.round(calculate));
                this.enableAbsen = x
            });
        },

        diffTime(current, fixed) {
            current = current.split(":");
            fixed = fixed.split(":");
            var currentDate = new Date(0, 0, 0, current[0], current[1], 0);
            var fixedDate = new Date(0, 0, 0, fixed[0], fixed[1], 0);
            var diff = (fixedDate.getTime() > currentDate.getTime()) ? fixedDate.getTime() - currentDate.getTime() : currentDate.getTime() - fixedDate.getTime();
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);
            return (fixedDate.getTime() > currentDate.getTime()) ? (hours * 60) + minutes : -((hours * 60) + minutes);
        },

        handleMarkerDrag(e) {
            this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        },

        panToMarker() {
            this.$refs.mapRef.panTo(this.marker.position);
        },

        handleMapClick(e) {
            this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        },

        rad(x) {
            return x * Math.PI / 180;
        },
        haversine_distance(a, b) {
            return haversine(a, b)
        },

        loadMap() {
            location.reload()
        }
    }
};
</script>