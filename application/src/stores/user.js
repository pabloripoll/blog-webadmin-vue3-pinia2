import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import { Axios } from 'axios'

// Basic example
/* export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: 'Matt',
        email: 'matt@learnvue.com'
    })

    const website = computed(() => {
        user.value.email.substring(user.value.email.lastIndexOf("@") + 1)
    })

    const changeName = (newName) => {
        user.value.name = newName
    }

    return {
        user,
        website,
        changeName
    }
}) */

export const useUserStore = defineStore('user', {
    id: null,

    state: () => {
        return {
            user: {
                id: null,
                alias: null,
                name: null,
                surname: null,
                email: null,
                role: null,
                token: null,
                tokenCreatedAt: null,
                tokenExpiresAt: null,
                isAuthenticated: null,
            }
        }
    },

    actions: {

        initStore() {
            this.user.isAuthenticated = localStorage.getItem('user.token') ? 1 : 0

            if (localStorage.getItem('user.token')) {
                this.user.id = localStorage.getItem('user.id')
                this.user.alias = localStorage.getItem('user.alias')
                this.user.name = localStorage.getItem('user.name')
                this.user.surname = localStorage.getItem('user.surname')
                this.user.email = localStorage.getItem('user.email')
                this.user.role = localStorage.getItem('user.role')
                this.user.token = localStorage.getItem('user.token')
                this.user.tokenCreatedAt = localStorage.getItem('user.tokenCreatedAt')
                this.user.tokenExpiresAt = localStorage.getItem('user.tokenExpiresAt')

                this.user.isAuthenticated = 1
            }
        },

        sessionCreate(data) {
            this.user.id = data.id ?? null
            this.user.alias = data.alias ?? null
            this.user.name = data.name ?? null
            this.user.surname = data.surname ?? null
            this.user.email = data.email ?? null
            this.user.role = data.role ?? null
            this.user.token = data.token ?? null
            this.user.tokenCreatedAt = data.tokenCreatedAt ?? null
            this.user.tokenExpiresAt = data.tokenExpiresAt ?? null

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.alias', this.user.alias)
            localStorage.setItem('user.name', this.user.name)
            localStorage.setItem('user.surname', this.user.surname)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.role', this.user.role)
            localStorage.setItem('user.token', this.user.token)
            localStorage.setItem('user.tokenCreatedAt', this.user.tokenCreatedAt)
            localStorage.setItem('user.tokenExpiresAt', this.user.tokenExpiresAt)

            this.user.isAuthenticated = this.user.token ? 1 : 0
            this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.user.token
        },

        sessionUpdateUser(user) {
            this.user.id = user.id ?? localStorage.getItem('user.id')
            this.user.name = user.name ?? localStorage.getItem('user.id')
            this.user.surname = user.surname ?? localStorage.getItem('user.id')
            this.user.email = user.email ?? localStorage.getItem('user.id')
            this.user.role = user.role ?? localStorage.getItem('user.id')

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.name', this.user.name)
            localStorage.setItem('user.surname', this.user.surname)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.role', this.user.role)
        },

        sessionDelete() {
            this.user.id = null
            this.user.name = null
            this.user.surname = null
            this.user.email = null
            this.user.role = null
            this.user.token = null
            this.user.tokenCreatedAt = null
            this.user.tokenExpiresAt = null

            //localStorage.removeItem('user')//-> do not use it!
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.name', '')
            localStorage.setItem('user.surname', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.role', '')
            localStorage.setItem('user.token', '')
            localStorage.setItem('user.tokenCreatedAt', '')
            localStorage.setItem('user.tokenExpiresAt', '')

            this.user.isAuthenticated = 0
        },

        checkToken() {
            this.axios.get('/auth/token/' + this.user.token)
            .then((response) => {
                response = response.data

                this.user.token = response.data.token
            })
            .catch((error) => {
                console.log(error)
                this.sessionDelete()
            })
        },

        sessionExtend(data) {
            this.user.tokenExpiresAt = data.tokenExpiresAt

            localStorage.setItem('user.tokenExpiresAt', data.tokenExpiresAt)
        },

        refreshToken() {
            this.axios.get('/auth/refresh/', {
                refresh: this.user.refresh
            })
            .then((response) => {
                this.user.token = response.data.token

                localStorage.setItem('user.token', response.data.token)

                axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
            })
            .catch((error) => {
                console.log(error)
                this.sessionDelete()
            })
        }
    },
})

export default useUserStore