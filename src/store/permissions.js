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
        },
        $formErr(data, field) {
            if (data.length > 0) {
                const t = data.filter(item => item.field === field)
                return t[0] && t[0].message ? t[0].message : ''
            }
        },
    },
}