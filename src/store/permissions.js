export default {
    methods: {
        $can(permissionName) {
            const Permission = this.$store.state.auth.permissions
            if (typeof Permission !== 'undefined') {
                return Permission.indexOf(permissionName) !== -1
            }
        },
    },
}