import {defineStore} from 'pinia'
import {jwtDecrypt} from '../utils/jwt'

export const useJWT = defineStore('jwt', {
    state: () => {
        return ({
            jwt: '',
            id: '',
            username: ''
        })
    },
    getters: {
        getState: (state) => {
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
            let localToken = localStorage.getItem('token')
            // @ts-ignore
            this.jwt = localToken
            let payLoad = jwtDecrypt(localToken)
            this.username = payLoad.username
            this.id = payLoad.id
        },
        setJWT(jwt: string) {
            localStorage.setItem('token', jwt)
            this.updateStateFromLocal()
        }
    }
})