<template>
    <div class="cell">
        <div @click="add">
            <h3>{{ day }}</h3>
            <ul>
                <li v-for="task in tasksList" @click.stop="edit(task)">
                    <h4>{{ task.title }}</h4>
                    <h5 v-html="formatDate(task)"></h5>
                    <p>{{ task.description }}</p>
                </li>
            </ul>
        </div>

        <Manage :dialog="dialog"/>
    </div>
</template>

<script>
    import moment from 'moment';
    import Manage from './Manage.vue'
    export default {
        components: {
            Manage
        },
        props: ['calendar', 'tasks'],
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

                return startDate.format('HH:MM') + '-' + endDate.format('HH:MM');
            }
        },
        created() {
            this.day = this.$store.state.dayIterator;
            this.tasksList = this.tasks(this.day);
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
