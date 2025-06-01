let dishes = {}

async function GetDishes() {
    try{
        const response = await fetch(window.env.API_URL+"/api/foods")
        const data = await response.json()

        dishes = {
            "Dish": [],
            "Starter": [],
            "Dessert": [],
            "Drink": [],
            "Aperitif":[]
        }

        data.forEach(item => {
            dishes[item.type].push({
                id: item.id,
                title: item.name,
                description: item.description,
                price: parseFloat(item.price),
                image: window.env.API_URL+item.picture
            });
        });
        return dishes
    }catch(error){
        showApiError()
    }

}

function SendOrder(){
    fetch(window.env.API_URL+'/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tableNumber":window.env.TABLE_ID,
            "order":cart
        })
    })
}

function showApiError() {
    const overlay = document.querySelector('.api-error-overlay');
    overlay.classList.add('show');
}

function hideApiError() {
    const overlay = document.querySelector('.api-error-overlay');
    overlay.classList.remove('show');
}

// Fonction pour réessayer la connexion
function retryConnection() {
    hideApiError();
    // Ici, vous pouvez ajouter la logique pour réessayer la connexion
    window.location.reload();
}
