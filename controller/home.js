// on recupere depuis l'api
const menuItems = {
    aperitifs: [
        {
            id: 1,
            title: 'Olives Marinées',
            description: 'Mélange d\'olives provençales marinées aux herbes',
            price: 4.50,
            image: 'https://images.unsplash.com/photo-1592858167090-2473780d894d'
        },
        {
            id: 2,
            title: 'Plateau Charcuterie',
            description: 'Sélection de charcuteries fines',
            price: 12.00,
            image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41'
        }
    ],
    boissons: [
        {
            id: 3,
            title: 'Vin Rouge Bordeaux',
            description: 'Château Margaux 2018',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0'
        }
    ],
    entrees: [
        {
            id: 4,
            title: 'Soupe à l\'Oignon',
            description: 'Soupe traditionnelle avec croûtons et fromage gratiné',
            price: 8.50,
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd'
        }
    ],
    plats: [
        {
            id: 5,
            title: 'Coq au Vin',
            description: 'Poulet mijoté au vin rouge avec lardons et champignons',
            price: 24.00,
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e'
        }
    ],
    desserts: [
        {
            id: 6,
            title: 'Crème Brûlée',
            description: 'Crème vanille avec caramel croustillant',
            price: 8.00,
            image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814'
        }
    ]
};


// Fonction pour générer le HTML d'un item du menu
function createMenuItemHTML(item) {
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

// Fonction pour afficher les items dans chaque catégorie
function displayMenuItems() {
    for (const category in menuItems) {
        const container = document.getElementById(category);
        const items = menuItems[category];
        
        const row = document.createElement('div');
        row.className = 'row g-4';
        
        items.forEach(item => {
            row.innerHTML += createMenuItemHTML(item);
        });
        
        container.appendChild(row);
    }
}

// Fonction pour afficher les détails d'un item
function showItemDetails(itemId) {
    let selectedItem = null;
    
    for (const category in menuItems) {
        const item = menuItems[category].find(i => i.id == itemId);
        if (item) {
            selectedItem = item;
            break;
        }
    }

    if (selectedItem) {
        document.getElementById('modalItemImage').src = selectedItem.image;
        document.getElementById('modalItemTitle').textContent = selectedItem.title;
        document.getElementById('modalItemDescription').textContent = selectedItem.description;
        document.getElementById('modalItemQuantity').value = 1;
        document.getElementById('modalItemComments').value = '';
        
        itemDetailsModal.show();
    }
}

// Fonction pour augmenter la quantité
function increaseQuantity() {
    const input = document.getElementById('modalItemQuantity');
    input.value = parseInt(input.value) + 1;
}

// Fonction pour diminuer la quantité
function decreaseQuantity() {
    const input = document.getElementById('modalItemQuantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Gestion de la navigation entre les catégories
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    updateCartCount();

    // Gestion des onglets de catégorie
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');

            // Cacher tous les contenus de catégorie
            document.querySelectorAll('.category-content').forEach(content => {
                content.classList.remove('active');
            });

            // Afficher le contenu de la catégorie sélectionnée
            const category = tab.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
});
