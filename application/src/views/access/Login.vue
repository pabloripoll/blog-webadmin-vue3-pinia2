<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <router-link to="/login" class="h1"><b>Admin</b>PR</router-link>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div class="input-group mb-3">
                        <input id="email" type="email" v-model="form.email" class="form-control" placeholder="Email" :disabled="disableCheck">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input id="password" type="password" v-model="form.password" class="form-control" placeholder="Password" :disabled="disableCheck">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div id="login-status" class="col-12"></div>
                        <div class="col-8">
                            <!-- <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div> -->
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block" :disabled="disableCheck">Sign In</button>
                        </div>
                    </div>
                </form>
                <!-- <div class="social-auth-links text-center mt-2 mb-3">
                    <a href="#" class="btn btn-block btn-primary">
                        <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                    </a>
                    <a href="#" class="btn btn-block btn-danger">
                        <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                    </a>
                </div>
                <p class="mb-1">
                    <a href="/forgot-password">I forgot my password</a>
                </p>
                <p class="mb-0">
                    <a href="/register" class="text-center">Register a new membership</a>
                </p> -->
            </div>

        </div>

    </div>
</template>

<style lang="css">
    @import '@/assets/theme/adminlte/fonts/google-fonts.css';
    @import '@/assets/theme/adminlte/plugins/fontawesome-free/css/all.min.css';
    @import '@/assets/theme/adminlte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
    @import '@/assets/theme/adminlte/dist/css/adminlte.min.css';
</style>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export default {

    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            disableCheck: true,
            errors: []
        }
    },

    computed: {

    },

    methods: {

        loginStatus(params = {}) {
            let icon = params.icon ?? ''
            let field = params.field ?? null
            let status = params.status ?? 'default'
            let message = params.message ?? null
            let elem = `#login-status`
            this.disableCheck = ! this.disableCheck

            if (field) {
                document.querySelector(`#${field}`).focus()
            }

            if (status == 'default') {
                this.disableCheck = ! this.disableCheck
                message = message ?? `&nbsp;`
            }

            if (status == 'warning') {
                icon = icon ?? `fas fa-check`
                message = message ?? `Complete ${field}`
            }

            if (status == 'danger') {
                icon = icon ?? `fas fa-check`
                message = message ?? `Error on field ${field}`
            }

            if (status == 'success') {
                icon = icon ?? `fas fa-check`
                this.disableCheck = ! this.disableCheck
                message = message ?? `Complete ${field}`
            }

            document.querySelector(elem).innerHTML = `
            <div class="alert alert-${status} alert-dismissible">
                <span><i class="icon ${icon}"></i> ${message}</span>
            </div>
            `
        },

        async submitForm() {
            this.errors = []
            this.loginStatus()
            this.disableCheck = ! this.disableCheck

            if (this.form.email === '') {
                this.errors.push('email')
            }

            if (this.form.password === '') {
                this.errors.push('password')
            }

            if (this.errors.length !== 0) {
                this.loginStatus({status:'warning', field:this.errors[0]})
                this.errors = []

                return

            } else {
                console.log(import.meta.env.VITE_API_V1 + '/v1/auth/login')

                await this.axios.get('https://serialify-api.pabloripoll.com/api/v1/check', {"Content-Type": "application/json"})
                /* .then((response) => {
                    return response.json()
                }) */
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response.data.message)
                    this.loginStatus({status:'danger', message:'connection error', icon:'fas fa-wifi'})
                })

                /* await this.axios.post('/v1/auth/login', this.form, {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json"
                })
                .then(response => {
                    let data = response.data
                    console.log(data) */

                    /* this.userStore.setToken(response.data)
                    this.userStore.setUserInfo(response.data)
                    this.userStore.initStore(response.data) */
                    /* localStorage.setItem('user.id', data.id)
                    localStorage.setItem('user.name', data.name)
                    localStorage.setItem('user.surname', data.surname)
                    localStorage.setItem('user.email', data.email)
                    localStorage.setItem('user.role', data.role)
                    localStorage.setItem('user.token', data.token)
                    localStorage.setItem('isAuthenticated', 1) */

                    //axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;

                    //location.href = '/'
                    //this.$router.push('/')
                /* })
                .catch(error => {
                    this.loginStatus({status:'danger', message:'connection error', icon:'fas fa-wifi'})
                }) */

                /* await axios.get('/api/me/')
                .then(response => {
                    console.log({ 'message': response })
                    this.userStore.setUserInfo(response.data)
                    this.userStore.initStore(response.data)

                    this.$router.push('/')

                })
                .catch(error => {
                    console.log('error', error)
                }) */
            }
        }
    },

    mounted() {

        this.disableCheck = ! this.disableCheck
        this.loginStatus()

        // theme scripts
        let themejs_jquery = document.createElement('script')
        let themejs_bootstrap = document.createElement('script')
        let themejs_adminlte = document.createElement('script')

        themejs_jquery.setAttribute('src', '../src/assets/theme/adminlte/plugins/jquery/jquery.min.js')
        themejs_bootstrap.setAttribute('src', '../src/assets/theme/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js')
        themejs_adminlte.setAttribute('src', '../src/assets/theme/adminlte/dist/js/adminlte.min.js')

        themejs_jquery.async = false
        themejs_bootstrap.async = false
        themejs_adminlte.async = false

        document.body.appendChild(themejs_jquery)
        document.body.appendChild(themejs_bootstrap)
        document.body.appendChild(themejs_adminlte)
    }
}
</script>