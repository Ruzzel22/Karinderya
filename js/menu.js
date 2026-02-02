// --- MENU DATA & CART STATE ---
const menuItems = [
    { id: 1, name: "Pork Sisig", price: 95, category: "Best Seller", emoji: "🍳" },
    { id: 2, name: "Chicken Adobo", price: 85, category: "Classic", emoji: "🍗" },
    { id: 3, name: "Sinigang", price: 90, category: "Soup", emoji: "🍲" },
    { id: 4, name: "Lechon Kawali", price: 110, category: "Crispy", emoji: "🥓" },
    { id: 5, name: "Plain Rice", price: 15, category: "Sides", emoji: "🍚" },
    { id: 6, name: "Halo-Halo", price: 75, category: "Dessert", emoji: "🍧" }
];

let cart = [];

// --- FUNCTIONS ---

// Called by main.js to show the grid
function renderMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return; // Guard clause

    container.innerHTML = menuItems.map(item => `
        <div class="col-6 col-lg-4">
            <div class="menu-card h-100 p-3" onclick="addToCart(${item.id})">
                <div class="menu-img-placeholder mb-3">${item.emoji}</div>
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold mb-1">${item.name}</h6>
                        <span class="text-muted small">${item.category}</span>
                    </div>
                    <span class="fw-bold text-success">₱${item.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Logic to add item to local cart
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    renderCart(); // Update the sidebar immediately
}

// Updates the Right Sidebar
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center mt-5 text-muted"><p>Select items from the menu to start.</p></div>';
        totalEl.innerText = "₱0.00";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="order-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn">
            <div><small class="fw-bold text-dark">${item.name}</small></div>
            <small class="text-success fw-bold">₱${item.price}</small>
        </div>
    `).join('');

    const currentTotal = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = '₱${currentTotal.toFixed(2)}';
}