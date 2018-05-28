<template>
    <div>
        <div>
            <label for="email">Email: </label>
            <input type="text" id="email" v-model="loginData.email">
        </div>
        <div>
            <label for="email">Email: </label>
            <input type="text" id="email" v-model="loginData.email">
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                loginData: {
                    email: '',
                    password: ''
                }
            }
        },
        watch: {
            logged () {
                this.$router.push({path: '/roles'})
            }
        },
        computed: {
            ...mapGetters({
                logged: 'logged'
            })
        },
        methods: {
            login () {
                this.$store.dispatch('login', this.loginData)
            }
        }
    }
</script>

<style scoped>

</style>