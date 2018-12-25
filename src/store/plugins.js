export const logger = store => {//自定义
    store.subscribe((mutation,state) => {
        console.log(mutation)
    })
}