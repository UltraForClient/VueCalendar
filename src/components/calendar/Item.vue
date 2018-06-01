<template>
    <div class="cell">
        <h3>{{ day }}</h3>
        <v-list v-if="tasksList.length">
            <v-list-tile-title color="green">Liczba zadań niskiego priorytetu:  {{ countByPriority(1) }}</v-list-tile-title>
            <v-list-tile-title color="yellow">Liczba zadań średniego priorytetu: {{ countByPriority(2) }}</v-list-tile-title>
            <v-list-tile-title color="red">Liczba zadań wysokiego priorytetu: {{ countByPriority(3) }}</v-list-tile-title>
            <!--<v-list-tile>-->
                <!--<v-list-tile-content>-->
                <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
        </v-list>


    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: ['calendar', 'tasks', 'items', 'userList'],
        name: "Item",
        data () {
            return {
                tasksList: [],
                day: 1,
            }
        },
        methods: {
            edit(task) {
                console.log(task)
            },
            countByPriority(number) {
                let i = 0;

                this.tasksList.forEach(task => {
                    if(task.priority === number) i++;
                });

                return i.toString();
            },
            formatDate(task) {
                let startDate = moment(task.start_date);
                let endDate   = moment(task.end_date);

                return startDate.format('YYYY:MM:DD HH:MM') + '-' + endDate.format('YYYY:MM:DD HH:MM');
            }
        },
        created() {
            this.day = this.$store.state.dayIterator;

            this.tasksList = this.tasks(this.day, this.items);
            this.$store.state.dayIterator++;
        }
    }
</script>

<style scoped>
    .cell{
        height: 18vh;
        width: 12vw;
        border: 1px solid #ccc;
        font-size: 11px;
        background: #f5f5f5;
    }
</style>
