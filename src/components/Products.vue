<template>
    <div>
        <h2>Products</h2>
        <p>
            <input type="text" v-model="foo">
        </p>
        <p>{{foo}}</p>
        <ul>
            <li v-for="item in products" v-bind:key="item.id">
                <span>{{item.title}}</span>-
                <span>{{item.price}}</span>
                <br/>
                <button @click="addProductToCart(item)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    computed: {
        ...mapState('products',{
            products: 'all'
        }),
        foo: {//表单的双向数据绑定
            get () {
                return this.$store.state.foo
            },
            set (value) {
                this.$store.commit('setFoo',value)
            }
        }
    },
    methods:{
        ...mapActions('cart',['addProductToCart'])//把cart模块的addProductToCart方法映射到当前组件button绑定的方法
    },
    created() {
        this.$store.dispatch('products/getAllProducts')//发起action请求
    }
}
</script>
