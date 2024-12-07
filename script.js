const apiURL = 'https://fakestoreapi.com/products'
const productContainer = document.getElementById('product-container')
const cartCount = document.querySelectorAll('.cart-count')
const cartView = document.getElementById('cart-view')
const cartBag = document.getElementById('cart-bag')
const cartProducts = document.getElementById('cart-products')


let cart = []
cartCount.forEach(count =>{
    count.innerHTML= cart.length
})

if(cart.length === 0){
    cartProducts.innerHTML = `
    <div class="text-center text-xl font-bold">No items in the cart.</div>
    `
}

function getProductsFromLocalStorage(){
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
        cartProducts.innerHTML = ''
        cart.forEach(item => {
            cartProducts.innerHTML+= `
            <div class="grid grid-cols-5 items-center gap-2 p-2 border rounded-lg mt-1">
             <div class="col-span-1"> <img class="h-16" src="${item.image}"/> </div>
             <div class="col-span-4">
                <div class="line-clamp-1 font-semibold text-sm">${item.title}</div>
                <div class="text-sm">$${item.price}</div>
                <button id="${item.id}" class="remove_cart_btn bg-red-500 text-white text-sm rounded-lg px-2 py-1"> <i class="ri-delete-bin-5-line"></i> Remove</button>
             </div>
            </div>
            `
        })

        const remove_cart_btns = document.querySelectorAll('.remove_cart_btn')
        remove_cart_btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.id)
                const new_cart = cart.filter(item => item.id !== id)
                cart = new_cart
                localStorage.setItem('cart', JSON.stringify(cart))
                getProductsFromLocalStorage()
            })
        })

        cartCount.forEach(count =>{
            count.innerHTML= cart.length
        })
    }
}

getProductsFromLocalStorage()

    


fetch(apiURL)
.then(res => res.json())
.then(data => {
    // console.log(data)
    productContainer.innerHTML = ''
    data.forEach(product =>{
        productContainer.innerHTML += `
        <div class="border relative flex flex-col items-center p-3 shadow-lg rounded-lg">
        <div><img class="h-32" src="${product.image}"/></div>
        <div class="font-bold text-lg line-clamp-1 mt-2">${product.title}</div>
        <div class="text-left w-full">${product.rating.count === 0 ? `<span class="text-red-500 text-sm font-semibold">Out of Stock</span>`: `<span class="text-green-500 text-sm font-semibold">In Stock(${product.rating.count})</span>` }</div>
        <div class="font-bold bg-green-500 w-full px-2 py-1 rounded-lg mt-1 text-white shadow-lg">$${product.price}</div>
        <div class="text-sm absolute right-4">⭐ ${product.rating.rate}</div>
        <button id="${product.id}" class="add-cart bg-orange-500 text-white mt-2 w-full py-1 rounded-lg shadow-xl font-semibold"> <i class="ri-shopping-cart-2-line"></i> Add to cart</button>
        </div>
        `
    });

    const addCart = document.querySelectorAll('.add-cart')
    addCart.forEach(btn =>{
        btn.addEventListener('click',()=>{
            const id = btn.id
            const product = data.find(p =>p.id === parseInt(id))
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
            
            
            cartCount.forEach(count =>{
                count.innerHTML = cart.length
            })
            getProductsFromLocalStorage() 

        })
    })


})
.catch(err =>{
    console.log(err)
})

cartBag.addEventListener('click', () => {
    cartView.classList.toggle('hidden')
})
