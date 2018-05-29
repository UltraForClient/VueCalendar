<template>
    <v-content>
        <Calendar/>
    </v-content>
</template>

<script>
    import Calendar from '@/components/calendar/List.vue'

    export default {
        components: {
            Calendar
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