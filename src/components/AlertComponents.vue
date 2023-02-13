<template>
    <v-alert outlined v-if="type !== '' && title !== '' && msg !== ''" :type="type" :title="title">
        <div v-for="(item, i) in msg" :key="i">{{ item.field + ' | ' + item.rule + ' : ' + item.message }}</div>
    </v-alert>
</template>
<script>
export default {
    props: {
        type: String,
        title: String,
        msg: Array
    },
}

</script>