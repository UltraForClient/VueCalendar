<template>
    <form v-if="show">
        <div>
            <label for="title">Tytuł zadania</label>
            <input type="text" id="title" v-model="task.title">
        </div>
        <div>
            <label for="description">Opis zadania</label>
            <textarea id="description" v-model="task.description"></textarea>
        </div>
        <div>
            <label for="start">Rozpoczęcie zdania</label>
            <input type="time" id="start" v-model="task.start_date">
        </div>
        <div>
            <label for="end">Zakończenia zdania</label>
            <input type="time" id="end" v-model="task.end_date">
        </div>
    </form>
</template>

<script>
    export default {
        props: ['dialog'],
        data () {
            return {
                show: false,
                task: {
                    title: '',
                    description: '',
                    start_date: null,
                    end_date: null
                }
            }
        },
        watch: {
            dialog () {
                this.show = this.dialog
            }
        }
    }</script>

<style scoped>

</style>
