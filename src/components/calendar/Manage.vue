<template>
    <v-dialog v-model="show" persistent max-width="800px">
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
                                v-model="task.end_date_date"
                                locale="pl"
                                :allowed-dates="allowedDates"
                        />

                        <v-time-picker v-model="task.end_date_time" format="24hr"/>
                    </v-card-text>
                    <v-card-text>
                        <v-card-title>
                            <span class="headline">Czas zakończnia</span>
                        </v-card-title>
                        <v-flex>

                            <v-date-picker
                                    v-model="task.start_date_date"
                                    locale="pl"
                                    :allowed-dates="allowedDates"
                            />

                            <v-time-picker v-model="task.start_date_time" format="24hr"/>
                        </v-flex>
                    </v-card-text>
                </v-container>
                <small>*Pola wymagane</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Zamknij</v-btn>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Zapisz</v-btn>
            </v-card-actions>
            <v-list three-line subheader>
                <v-list-tile v-for="item in userList" href="javascript:;">
                    <v-list-tile-action>
                        <v-checkbox v-model="item.selected"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content @click="item.selected = !item.selected">
                        <v-list-tile-title>{{ item.name }} {{ item.selected }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.email }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
        <pre>
            {{ userList }}
        </pre>
    </v-dialog>
</template>

<script>
    export default {
        props: ['dialog', 'userList'],
        data () {
            return {
                show: false,
                task: {
                    title: '',
                    description: '',
                    start_date_time: null,
                    start_date_date: null,
                    end_date_time: null,
                    end_date_date: null,
                },
                test: false
            }
        },
        watch: {
            dialog () {
                this.show = this.dialog
            },
        },
        methods: {
            allowedDates: val => {
                return Date.parse(val) >= (Date.parse(new Date()) - 86400000);
            },
            prepareUser() {
                this.userList.forEach(user => user.selected = false)
            }
        },
        created() {
            this.prepareUser();
        }
    }
</script>

<style>
    /*.picker--time .picker__title {*/
        /*padding: 9px;*/
    /*}*/
    .picker.picker--time.card {
        margin-left: 15%;
    }
</style>
