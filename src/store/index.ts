import {createStore} from "vuex"

export interface MyState {
    collapse: boolean
}

const store = createStore<MyState>({
    state: {
        collapse: false
    },
    mutations: {
        setCollapse(state: MyState, collapse: boolean) {
            state.collapse = collapse
        }
    },
    getters: {
        getCollapse(state: MyState) {
            return state.collapse
        }
    }
})
export default store