<template>
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa sed, vitae laudantium dolores dolorem iusto
        ipsa quae quam veniam quis ducimus tenetur eveniet expedita dignissimos et aspernatur reiciendis tempore!
    </div>
</template>
<script>
export default {
    mounted(){
        this.tes()
    },
    methods: {
        hitunghari(taun, bulan) {
            return new Date(taun, bulan, 0).getDate();
        },
        tes() {
            var jmlHari = this.hitunghari(new Date().getFullYear(), new Date().getMonth())
            var jmlGaji = 2000000
            var calculate = jmlGaji/jmlHari
            console.log(`bayaran perhari = ${Math.round(calculate)}, jumlah hari perbulan = ${jmlHari}, jumlah gaji yang harus dibayar = ${jmlGaji}, total absen = 5, jadi gaji yang dibayar = 5 x ${Math.round(calculate)} = ${Math.round(calculate * 5)}`);
        }
    }
}
</script>