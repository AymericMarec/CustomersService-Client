export function createMenuItemHTML(item) {
    return `
        <div class="col-md-4">
            <div class="card menu-item" onclick="showItemDetails('${item.id}')">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price-tag">${item.price.toFixed(2)} €</span>
                        <button class="btn btn-outline-primary btn-add" onclick="event.stopPropagation(); addToCart('${item.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function displayMenuItems() {
    for (const category in dishes) {
        const container = document.getElementById(category);
        const items = dishes[category];
        
        const row = document.createElement('div');
        row.className = 'row g-4';
        
        items.forEach(item => {
            row.innerHTML += createMenuItemHTML(item);
        });
        
        container.appendChild(row);
    }
}

export function showItemDetails(itemId) {
    let selectedItem = null;
    
    for (const category in dishes) {
        const item = dishes[category].find(i => i.id == itemId);
        if (item) {
            selectedItem = item;
            break;
        }
    }

    if (selectedItem) {
        document.getElementById('modalItemImage').src = selectedItem.image;
        document.getElementById('modalItemTitle').textContent = selectedItem.title;
        document.getElementById('modalItemDescription').textContent = selectedItem.description;
        document.getElementById('modalItemPrice').textContent = selectedItem.price
        document.getElementById('modalItemQuantity').value = 1;
        document.getElementById('modalItemComments').value = '';
        
        itemDetailsModal.show();
    }
}

export function increaseQuantity() {
    const input = document.getElementById('modalItemQuantity');
    input.value = parseInt(input.value) + 1;
}

export function decreaseQuantity() {
    const input = document.getElementById('modalItemQuantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}
