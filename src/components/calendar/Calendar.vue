<template>
    <div>
        <v-btn @click="add">Dodaj nowe zadanie</v-btn>
        <v-toolbar>
            <v-toolbar-title>
                <v-btn @click="changeMonth(false)">&laquo;</v-btn>
            </v-toolbar-title>
            <v-toolbar-title>{{ currentDate }}</v-toolbar-title>
            <v-toolbar-title>
                <v-btn @click="changeMonth()">&raquo;</v-btn>
            </v-toolbar-title>
        </v-toolbar>
        <div class="grid-view">
            <div class="header-cell" v-for="(day, key) in tasksHeader">
                {{ day.name }}
            </div>

            <Item   v-if="checkCalendar(i) && Array.isArray(tasks) && Array.isArray(userList)"
                    v-for="(i, key) in 42"
                    :key="key + '-' + calendar.month"
                    :calendar="calendar"
                    :tasks="isTask"
                    :items="tasks"
                    :userList="userList"
            />
            <div class="blank-cell" v-else></div>
        </div>

        <Manage
                :dialog="dialog"
                :userList="userList"
        />
    </div>
</template>

<script>
    import moment from 'moment';
    import Item from './Item.vue';
    import Manage from './Manage.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: {
            Item, Manage
        },
        data() {
            return {
                type: '',
                calendar: {
                    days: 0,
                    day: 0,
                    month: 0,
                    year: 0
                },
                ayIterator: 0,
                tasksHeader: [
                    {name: 'Poniedziałek'},
                    {name: 'Wtorek'},
                    {name: 'Środa'},
                    {name: 'Czwartek'},
                    {name: 'Piątek'},
                    {name: 'Sobota'},
                    {name: 'Niedziela'}
                ],
                daysNo: {
                    mo: 1,
                    tu: 2,
                    we: 3,
                    th: 4,
                    fr: 5,
                    sa: 6,
                    su: 7
                },
                dialog: false
            }
        },
        computed: {
            currentDate() {
                return this.calendar.year + '-' + this.calendar.month + '-' + this.calendar.day;
            },
            ...mapGetters({
                tasks: 'tasksGive',
                userList: 'userList'
            })
        },
        methods: {
            isTask(day, tasks) {
                if (day < 10) day = '0' + day;

                const date = Date.parse(this.calendar.year + '-' + this.calendar.month + '-' + day);

                return tasks.filter(task => {
                    const startDate = moment(task.start_date);
                    const endDate = moment(task.end_date);

                    if (date >= Date.parse(startDate.format('YYYY-MM-DD')) && date <= Date.parse(endDate.format('YYYY-MM-DD'))) {
                        return task;
                    }
                })
            },
            changeMonth(forward = true) {
                let month;
                let year = this.calendar.year;

                if(forward) {
                    if(this.calendar.month == '12')
                        year = moment(this.currentDate).add(1, 'year').year();

                    month = moment(this.currentDate).add(1, 'months');
                } else {
                    if(this.calendar.month == '01')
                        year = moment(this.currentDate).subtract(1, 'year').year();

                    month = moment(this.currentDate).subtract(1, 'months');
                }

                this.calendar.month = month.format('MM');
                this.calendar.days = month.daysInMonth();
                this.calendar.year = year;
                this.calendar.firstDayOfMonth = this.getNo(month.startOf('month').format('dd'));
                this.$store.state.dayIterator = 1;
            },
            checkCalendar(i) {
                let tempDays = this.calendar.days + this.calendar.firstDayOfMonth;

                return (i >= this.calendar.firstDayOfMonth && i <= tempDays);
            },
            getNo(day) {
                return this.daysNo[day.toLocaleLowerCase()];
            },
            add() {
                this.dialog = true
            }
        },
        created () {
            this.$store.dispatch('tasks', localStorage.getItem('userId'));
            this.$store.dispatch('userList');

            const date = moment();
            this.calendar.days = date.daysInMonth();
            this.calendar.year = date.year();
            this.calendar.month = date.format('MM');
            this.calendar.day = date.format('DD');
            this.calendar.firstDayOfMonth = this.getNo(date.startOf('month').format('dd'));
        }
    }
</script>

<style scoped>

    .grid-view {
        display: grid;
        grid-template-columns: repeat(7, auto);
        width: 84vw;
        margin: 0 auto;
    }
    .header-cell {
        color: #fff;
        text-align: center;
        font-family: monospace;
        font-size: 11px;
        padding: 5px;
        background: #000;
    }
    .blank-cell {
        height: 18vh;
        border: 1px solid #ccc;
        background: #ffffff;
    }
</style>
