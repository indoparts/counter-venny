<template>
    <v-switch v-model="switchData" inset :label="`${switchData ? 'Dark Mode' : 'Light Mode'}`"></v-switch>
</template>
<script>
export default {
    data() {
        return {
            switchData: true
        }
    },
    mounted() {
        const theme = localStorage.getItem("mode_theme");
        if (theme) {
            if (theme === "true") {
                this.switchData = true
                this.$vuetify.theme.dark = true;
            } else {
                this.switchData = false
                this.$vuetify.theme.dark = false;
            }
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.switchData = true
            this.$vuetify.theme.dark = true;
            localStorage.setItem(
                "mode_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    },
    watch:{
        switchData(v){
            this.$vuetify.theme.dark = v;
            localStorage.setItem("mode_theme", this.$vuetify.theme.dark.toString());
        }
    }
}
</script>