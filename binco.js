if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removeItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i <removeItemButtons.length;i++) {
        var button = removeItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i <quantityInputs.length;i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i <addToCartButtons.length;i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked(){
    alert('Thank you for purchasing')
    var cartItems = document.getElementsByClassName('items-cart')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotalPrice()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotalPrice()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotalPrice()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var image = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price,image)
    updateTotalPrice()
}

function addItemToCart(title,price,image) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('items-cart')[0]
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" width="100" height="100" src="${image}">
            <span class="cart-item-title">${title}</span>
        </div>   
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText==title) {
            window.alert('This item is already in the cart!')
            return
        }
    }
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateTotalPrice() {
    var cartSection = document.getElementsByClassName('cart-section')[0]
    var cartItemContainer = document.getElementsByClassName("items-cart")[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length;i++) {
        var cartRow = cartRows[i]
        var priceItem = cartRow.getElementsByClassName('cart-price')[0]
        var quantityItem = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceItem.innerText.replace('$', ''))
        var quantity = quantityItem.value
        total = total + (price * quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total
    if (total > 0) {
        cartSection.style.display = 'block'
    } else {
        cartSection.style.display = 'none'
    }
}
