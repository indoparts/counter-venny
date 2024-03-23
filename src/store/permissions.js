export default {
    methods: {
        $can(permissionName) {
            const Permission = this.$store.state.auth.permissions
            if (typeof Permission !== 'undefined') {
                return Permission.indexOf(permissionName) !== -1
            }
        },
        $roundToDecimal(number, decimalPlaces) {
            const factor = 10 ** decimalPlaces;
            return Math.round(number * factor) / factor;
        }
    },
}