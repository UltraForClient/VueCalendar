<template>
    <div>
        {{ tasks }}
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                tasks: 'tasksGive',
            })
        },
        created () {
            this.$store.dispatch('tasks', localStorage.getItem('userId'));
        }
    }
</script>

<style scoped>

</style>