<template>
    <v-app id="inspire">
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-toolbar color="green" dark>
                        <v-toolbar-title>Lista zadań króte nadałeś</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <v-list-group
                                v-for="priority in priorities"
                                v-model="priority.active"
                                :key="priority.name"
                                no-action>
                            <!--:prepend-icon="item.action"-->
                        <!--&gt;-->
                            <v-list-tile slot="activator" :class="priority.color">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ priority.name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-for="task in tasks" :key="tasks.name" v-if="task.priority === priority.value">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ task.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <button @click="edit(task)">Edytuj</button>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>

        <Manage
                :dialog="dialog"
                :userList="userList"
                :editTask="task"
        />

    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Manage from './Manage.vue';

    export default {
        components: {
            Manage
        },
        data() {
            return {
                priorities: [
                    {name: 'Niski', active: false, value: 1},
                    {name: 'Średnie', active: false, value: 2},
                    {name: 'Wysoki', active: false, value: 3}
                ],
                dialog: false,
                task: {}
            }
        },
        computed: {
            ...mapGetters({
                tasks: 'tasksGive',
                userList: 'userList'
            })
        },
        methods: {
            edit(task) {
                this.dialog = true;
                this.task = task;
            }
        },
        created () {
            this.$store.dispatch('tasks', localStorage.getItem('userId'));
            this.$store.dispatch('userList');
        }
    }
</script>

<style scoped>

</style>