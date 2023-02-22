<template>
    <v-dialog v-model="dialog" :max-width="width">
        <v-card class="card">
            <v-card-title class="text-h5">{{ title }}</v-card-title>

            <v-card-text>{{ text }}</v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="evntYes()">
                    Ya
                </v-btn>

                <v-btn color="green darken-1" text @click="evntNo()">
                    Tidak
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default{
    props: {
        show: Boolean,
        width: Number,
        title: String,
        text: String,
    },
    data() {
        return {
            dialog: false,
        }
    },
    watch: {
        show: function (v) {
            this.dialog = v
        }
    },
    methods:{
        evntYes(){
            this.dialog = false
            this.$emit('callback', { dialog: this.dialog, event: 'yes' })
        },
        evntNo(){
            this.dialog = false
            this.$emit('callback', { dialog: this.dialog, event: 'no' })
        }
    }
}
</script>