<template>
    <form @submit.prevent="login">
        <div>
            <label for="email">Email: </label>
            <input type="text" id="email" v-model="loginData.email">
        </div>
        <div>
            <label for="password">Hasło: </label>
            <input type="password" id="password" v-model="loginData.password">
        </div>
        <button type="submit">Zaloguj się </button>
    </form>
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
            logged() {
                this.$router.push({path: '/'})
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