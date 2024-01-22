<template>
    <div>
        <v-sheet tile height="54" class="d-flex" color="card">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="type"></v-select>
            <v-select v-model="mode" :items="modes" dense outlined hide-details label="event-overlap-mode"
                class="ma-2"></v-select>
            <v-select v-model="weekday" :items="weekdays" dense outlined hide-details label="weekdays"
                class="ma-2"></v-select>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="600" color="card">
            <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type" :events="events" class="card"
                :event-overlap-mode="mode" :event-overlap-threshold="30" :event-color="getEventColor"></v-calendar>
        </v-sheet>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
            { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
            { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
            { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
            { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted(){
        this.get()
    },
    methods: {
        ...mapActions('time_config', ['getJadwaUser']),
        get() {
            this.getJadwaUser().then((res) => {
                const events = []
                if (res.status === 200) {
                    res.data.data.forEach(el => {
                        // console.log(el);
                        const allDay = this.rnd(0, 3) === 0
                        const firstTimestamp = this.rnd(new Date(el.date).getTime(), new Date(el.date).getTime())
                        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                        const second = new Date(first.getTime() + secondTimestamp)
                        events.push({
                            name: el.time_config.type,
                            start: first,
                            end: second,
                            color: this.colors[this.rnd(0, this.colors.length - 1)],
                            timed: !allDay,
                        })
                    });
                }
                this.events = events
            })
        },
        getEventColor(event) {
            return event.color
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    },
}
</script>