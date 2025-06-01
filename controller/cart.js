let cart = [];

const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const itemDetailsModal = new bootstrap.Modal(document.getElementById('itemDetailsModal'));
document.getElementById('cartModal').addEventListener('show.bs.modal', showCart);


function addToCart(ItemId){
    
    for (const category in dishes) {
        const item = dishes[category].find(i => i.id == ItemId);
        if (item) {
            cart.push({
                id:item.id,
                title: item.title,
                quantity: 1,
                comments: "",
                price: item.price
            });
            updateCartCount();
            return;
        }
    }
}

function addToCartDetails() {
    const quantity = document.getElementById('modalItemQuantity').value;
    const comments = document.getElementById('modalItemComments').value;
    const price = document.getElementById('modalItemPrice').textContent;
    cart.push({
        title: document.getElementById('modalItemTitle').textContent,
        quantity: quantity,
        comments: comments,
        price: price
    });
    document.getElementById('modalItemQuantity').value = 1
    document.getElementById('modalItemComments').value = ""

    
    updateCartCount();
    itemDetailsModal.hide();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    document.querySelector('.cart-count').textContent = count;
}

function showCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${item.title}</h5>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="card-text">Quantité: ${item.quantity}</p>
                ${item.comments ? `<p class="card-text">Commentaires: ${item.comments}</p>` : ''}
                <p class="card-text">Prix: ${(item.price * item.quantity).toFixed(2)} €</p>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `${total.toFixed(2)} €`;
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart();
}

function confirmOrder() {
    SendOrder()
    cart = [];

    updateCartCount();
    cartModal.hide();
    ShowWaitingScreen();
}

