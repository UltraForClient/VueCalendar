<template>
    <div class="cell" @click="add()">
        <h3>{{ day }}</h3>
        <v-list v-if="tasksList.length">
            <v-list-tile avatar v-for="task in tasksList" :key="task.title" @click.stop="edit(task)">
                <v-list-tile-content>
                    <v-list-tile-title v-text="task.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="formatDate(task)"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <Manage
                :dialog="dialog"
                :userList="userList"
        />
    </div>
</template>

<script>
    import moment from 'moment';
    import Manage from './Manage.vue';

    export default {
        components: {
            Manage
        },
        props: ['calendar', 'tasks', 'items', 'userList'],
        name: "Item",
        data () {
            return {
                tasksList: [],
                day: 1,
                dialog: false
            }
        },
        methods: {
            add() {
                this.dialog = true
            },
            edit(task) {
                console.log(task)
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
