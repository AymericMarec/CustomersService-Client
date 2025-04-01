let cart = [];

const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const itemDetailsModal = new bootstrap.Modal(document.getElementById('itemDetailsModal'));
document.getElementById('cartModal').addEventListener('show.bs.modal', showCart);

function addToCart() {
    const quantity = document.getElementById('modalItemQuantity').value;
    const comments = document.getElementById('modalItemComments').value;

    cart.push({
        title: document.getElementById('modalItemTitle').textContent,
        quantity: quantity,
        comments: comments,
        price: parseFloat(document.querySelector('.price-tag').textContent)
    });
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



function showItemDetails(item) {
    document.getElementById('modalItemImage').src = item.image;
    document.getElementById('modalItemImage').alt = item.title;
    document.getElementById('modalItemTitle').textContent = item.title;
    document.getElementById('modalItemDescription').textContent = item.description;
    itemDetailsModal.show();
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        const description = this.querySelector('.card-text').textContent;
        const image = this.querySelector('img').src;
        const price = this.querySelector('.price-tag').textContent;
        
        showItemDetails({
            title: title,
            description: description,
            image: image,
            price: price
        });
    });
});

document.querySelectorAll('.add-cart').forEach(item => {
    item.addEventListener('click', function() {
        event.stopPropagation();
        const itemNode = this.parentElement.parentElement.parentElement;
        const title = itemNode.querySelector('.card-title').textContent;
        const description = itemNode.querySelector('.card-text').textContent;
        const image = itemNode.querySelector('img').src;
        const price = parseFloat((itemNode.querySelector('.price-tag').textContent).slice(0, -1));
        cart.push({
            title: title,
            description: description,
            image: image,
            price: price,
            quantity:1
        })
        updateCartCount();
    });
});


function confirmOrder() {
    const serveAllTogether = document.getElementById('serveAllTogether').checked;
    const tableID = window.env.TABLE_ID
    alert(tableID);
    cart = [];
    updateCartCount();
    cartModal.hide();
}