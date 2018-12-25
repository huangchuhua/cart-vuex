import * as shop from '@/api/shop'
const state = {
    items: [],//存放商品id和数量quantity
    checkoutStatus: null//null/sucess/faild
}

const getters = {
    cartProducts (state,getters,rootState) {
        return state.items.map((product) => {
            const prod = rootState.products.all.find(item => item.id === product.id)
            return {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                quantity: product.quantity
            }
        })
    },
    totalPrice(state,getters) {
        return getters.cartProducts.reduce((total,prod) => {//state中的数据不全，使用cartProducts中的数据
            return total + prod.price * prod.quantity
        },0)
    }
}

const mutations = {
    pushProductToCart(state,payload) {
        state.items.push({
            id: payload.id,
            quantity: 1
        })
    },
    incrementItemQuantity(state,payload){
        const cartItem = state.items.find(item => item.id === payload.id)
        cartItem.quantity++
    },
    setCheckoutStatus (state,payload) {
        state.checkoutStatus = payload
    },
    setItems (state,payload) {
        state.items = payload
    }
}

const actions = {
    checkout({state,commit},products) {//products是组件传过来的
        //备份购物车数据
        const savedCartProducts = [...products]

        //清除支付状态
        commit('setCheckoutStatus',null)

        //清空购物车
        commit('setItems', [])
        
        //发起结账请求
        //    成功，设置成功状态
        //    失败，设置失败状态，回滚购物车数据  
        shop.buyProducts(
            products,
            () =>{//成功
                console.log(1)
                commit('setCheckoutStatus','successful')
            },
            () =>{
                console.log(2)
                commit('setCheckoutStatus','failed')
                commit('setItems',savedCartProducts)
            }
        )   
    },
    addProductToCart({state,commit},product) {
        /**
         * 1、如果商品的数量>0,执行添加购物车逻辑
         *      如果购物车中已存在该商品，则让该商品数量+1
         *      如果没有，则添加商品到购物车
         * 2、最后，让商品本身的数量-1
         */
        if (product.inventory) {
            const cartItem = state.items.find(({id}) => id === product.id) //{id}是解构items中每项的id
            if (cartItem) {
                commit({
                    type: 'incrementItemQuantity',
                    id: product.id
                })
            }else {
                commit({
                    type: 'pushProductToCart',
                    id: product.id
                })
            }
            commit('products/decrementProductInventory', {
              id: product.id
            }, {
              root: true
            }) //向products模块提交commit,需要设置{root:true}
        }else {
            alert("商品库存为空")
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}