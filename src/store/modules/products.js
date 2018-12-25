import * as shop from '@/api/shop'

const state = {
    all: []
}

const getters = {}

const mutations = {//修改state
    setProducts(state,payload) {//payload是actions提交的数据
        state.all = payload.products//把actions的数据更新保存到state中
    },
    decrementProductInventory(state,payload) {
        const product = state.all.find(item => item.id === payload.id)
        product.inventory--
    }
}

const actions = {//执行异步操作，提交mutations
    async getAllProducts({commit}){//模拟异步请求数据
        const products = await shop.getAllProducts()
        console.log(products)
        commit({
            type: 'setProducts',//这是mutations中的方法
            products//这是向mutations提交的数据
        })
    }
}

export default {
    namespaced: true,
  state,
  getters,
  mutations,
  actions
}