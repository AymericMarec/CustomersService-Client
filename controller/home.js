
document.addEventListener('DOMContentLoaded', async () => {
    await GetDishes()
    displayMenuItems();
    updateCartCount();

    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.category-content').forEach(content => {
                content.classList.remove('active');
            });

            const category = tab.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
});
