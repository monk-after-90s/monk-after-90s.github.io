import {defineStore} from 'pinia'
import {jwtDecrypt} from '../utils/jwt'

export const useJWT = defineStore('jwt', {
    state: () => {
        return ({
            jwt: '',
            exp: 0,
            id: 0,
            username: ''
        })
    },
    getters: {
        getState(state) {
            let localToken = localStorage.getItem('token')
            if (localToken != state.jwt) {
                // @ts-ignore
                this.updateStateFromLocal()
            }
            return state
        }
    },
    actions: {
        updateStateFromLocal() {
            let localToken = localStorage.getItem('token') ?? ''
            // @ts-ignore
            if (localToken) {
                let payLoad = jwtDecrypt(localToken)
                this.jwt = localToken
                this.username = payLoad.username
                this.id = payLoad.id
                this.exp = payLoad.exp
            } else {
                this.$reset()
            }
        },
        setJWT(jwt: string) {
            localStorage.setItem('token', jwt)
            this.updateStateFromLocal()
        },
        delJWT() {
            localStorage.removeItem('token')
            this.$reset()
        }
    }
})