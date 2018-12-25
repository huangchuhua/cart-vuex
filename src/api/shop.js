const _products = [
    {"id": 1,"title":"ipad 4 mini","price": 500.88,"inventory":2},
    {"id": 2,"title":"iphoneMX 256G","price": 5000.88,"inventory":3},
    {"id": 3,"title":"Charli XCX -Sucker CD","price": 19.99,"inventory":5},
]

export const getAllProducts = () =>{
    return new Promise((resolve,reject) =>{
        setTimeout(function() {
            resolve(_products)
        },100)
    })
}

//模拟支付请求
export const buyProducts = (products,cb,errcb) => {
    setTimeout(() => {
        Math.random() > 0.5 ? cb() : errcb()
    },100)
}