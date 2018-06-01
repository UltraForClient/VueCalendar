<template>
    <v-app>
        <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="drawer">
            <v-list dense class="grey lighten-4">
                <template v-for="(item, i) in items">
                    <v-list-tile :key="i" :to="item.path">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="grey--text">
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" app absolute clipped-left>
            <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
            <span class="title ml-3 mr-5">Kalendarz<span class="text"> zadań</span></span>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
                items: [
                    { icon: 'settings', text: 'Kalendarz zadanych zadań', path: '/calendar/give-task' },
                    { icon: 'settings', text: 'Kalendarz zadanych zadań', path: '/calendar/get-task' },
                    { icon: 'settings', text: 'Kalendarz zadanych zadań', path: '/list/give-task' },
                    { icon: 'settings', text: 'Kalendarz zadanych zadań', path: '/list/get-task' }
                ]
            }
        },
        props: {
            source: String
        }
    }
</script>

<style scoped>
    #keep main .container {
        height: 660px;
    }
    .navigation-drawer__border {
        display: none;
    }
    .text {
        font-weight: 400;
    }
</style>