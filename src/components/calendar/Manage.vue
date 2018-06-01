<template>
    <v-dialog v-model="show" persistent max-width="800px" color="red">
        <v-card>
            <v-card-title>
                <span class="headline">Dodaj nowe zadanie</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="Tytuł zadania" v-model="task.title" required></v-text-field>
                    <v-text-field label="Opis zadania" v-model="task.description" required :multi-line="true"></v-text-field>
                    <v-card-text>
                        <v-card-title>
                            <span class="headline">Czas rozpoczęcia</span>
                        </v-card-title>
                        <v-date-picker
                                v-model="task.start_date_date"
                                locale="pl"
                                :allowed-dates="allowedDates"
                        />

                        <v-time-picker v-model="task.start_date_time" format="24hr"/>
                    </v-card-text>
                    <v-card-text>
                        <v-card-title>
                            <span class="headline">Czas zakończnia</span>
                        </v-card-title>
                        <v-flex>

                            <v-date-picker
                                    v-model="task.end_date_date"
                                    locale="pl"
                                    :allowed-dates="allowedDates"
                            />

                            <v-time-picker v-model="task.end_date_time" format="24hr"/>
                        </v-flex>
                    </v-card-text>
                </v-container>
                <small>*Pola wymagane</small>
            </v-card-text>
            <v-card-title>
                <span class="headline">Przypisz do użytkowników</span>
            </v-card-title>
            <v-list>
                <v-list-group no-action>
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>Użytkownicy</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-text-field solo-inverted flat label="Search" prepend-icon="search" v-model="search"></v-text-field>
                    </v-list-tile>
                    <v-list-tile v-for="user in filteredList" @click="">
                        <v-list-tile-action>
                            <v-icon>person_pin</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-checkbox v-model="task.user_id" :label="user.name + ' ' + user.email" :value="user.id"></v-checkbox>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
            </v-list>
            <v-card-title>
                <span class="headline">Priorytet zadania</span>
            </v-card-title>
            <v-radio-group v-model="task.priority" :mandatory="false">
                <v-radio
                        :label="'Prorytet ' + item.name"
                        :value="item.number"
                        :color="item.color"
                        v-if="item.id !== id"
                        v-for="item in priority"
                ></v-radio>
            </v-radio-group>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Zamknij</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Zapisz</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['dialog', 'userList', 'editTask'],
        data () {
            return {
                search: '',
                show: false,
                task: {
                    title: '',
                    description: '',
                    start_date_time: null,
                    start_date_date: null,
                    end_date_time: null,
                    end_date_date: null,
                    user_id: [],
                    priority: 1
                },
                priority: [
                    {
                        name: 'niski',
                        color: 'green',
                        number: 1
                    },
                    {
                        name: 'średni',
                        color: 'yellow',
                        number: 2
                    },
                    {
                        name: 'wysoki',
                        color: 'red',
                        number: 3
                    }
                ],
                id: localStorage.getItem('userId')
            }
        },
        watch: {
            dialog() {
                this.show = this.dialog;

                if(this.editTask) {
                    const startDate = this.editTask.start_date.split(' ');
                    const endDate = this.editTask.end_date.split(' ');

                    this.task = {
                        title: this.editTask.title,
                        description: this.editTask.description,
                        start_date_date: startDate[0],
                        start_date_time: startDate[1],
                        end_date_date: endDate[0],
                        end_date_time: endDate[1],
                        user_id: Object.values(this.editTask.pivot.user_get_id),
                        priority: this.editTask.priority
                    };
                }
            }
        },
        computed: {
            filteredList() {
                return this.userList.filter(user => {
                    return user.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
        methods: {
            allowedDates: val => {
                return Date.parse(val) >= (Date.parse(new Date()) - 86400000);
            },
            save() {
                this.dialog = false;
                const data = {
                    title: this.task.title,
                    description: this.task.description,
                    start_date: this.task.start_date_date + ' ' + this.task.start_date_time,
                    end_date: this.task.end_date_date + ' ' + this.task.end_date_time,
                    priority: this.task.priority,
                    user_get_id: this.task.user_id,
                    user_give_id: localStorage.getItem('userId')
                };

                this.$store.dispatch('createTask', data);
            }
        }
    }
</script>

<style>
    .picker.picker--time.card {
        margin-left: 15%;
    }
</style>

