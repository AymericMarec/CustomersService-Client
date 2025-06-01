let dishes = {}

async function GetDishes() {
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
            image: ""
        });
    });
    return dishes
}
