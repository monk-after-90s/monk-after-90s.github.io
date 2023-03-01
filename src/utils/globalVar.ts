import {getCurrentInstance} from 'vue'

export default function useGlobalProperties() {
    // @ts-ignore
    const {emit, appContext: {app: {config: {globalProperties}}}} = getCurrentInstance()
    return {...globalProperties}
}
