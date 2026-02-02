// --- GLOBAL METRICS (Student 4) ---
let dailySales = 0;
let totalOrdersCount = 0;

// --- NAVIGATION LOGIC ---
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('d-none'));
    document.getElementById(viewId).classList.remove('d-none');
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
}

function showMenu() {
    switchView('view-dashboard');
    renderMenu(); // From menu.js
}

function showOrders() {
    switchView('view-orders');
    renderOrderHistory(); // From history.js
}

function showSettings() {
    switchView('view-settings');
}

// --- CHECKOUT LOGIC (The Glue) ---
function checkout() {
    // 1. Validation (Uses 'cart' from menu.js)
    if (cart.length === 0) {
        alert("Please add items first.");
        return;
    }

    // 2. Calculate Total
    const orderValue = cart.reduce((sum, item) => sum + item.price, 0);
    
    // 3. Update Metrics (Student 4)
    dailySales += orderValue;
    totalOrdersCount += 1;

    // 4. Create Order Object
    const newOrder = {
        id: '#ORD-${1000 + totalOrdersCount}',
        items: cart.map(i => i.name).join(", "),
        total: orderValue,
        status: "Completed"
    };

    // 5. Save to History (Uses function from history.js)
    addOrderToHistory(newOrder);

    // 6. Update UI Metrics
    document.getElementById('total-sales').innerText = `₱${dailySales.toFixed(2)}`;
    document.getElementById('order-count').innerText = totalOrdersCount;

    // 7. Reset Cart (Modify 'cart' in menu.js)
    // Note: Since 'cart' is a global let in menu.js, we can clear it:
    cart.length = 0; // Empty the array
    renderCart();
    
    alert("Order successfully punched!");
}
// --- 1. NEW: LIVE CLOCK LOGIC ---
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('live-clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
}

// --- 2. NEW: ACTIVITY FEED LOGIC ---
function logActivity(message) {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create new log entry
    const entry = document.createElement('div');
    entry.className = 'activity-item';
    entry.innerHTML = `
        <div class="dot"></div>
        <span>${message}</span>
        <span class="activity-time">${time}</span>
    `;

    // Add to top
    feed.prepend(entry);
}

// --- UPDATED CHECKOUT LOGIC ---
function checkout() {
    if (cart.length === 0) {
        alert("Please add items first.");
        return;
    }

    const orderValue = cart.reduce((sum, item) => sum + item.price, 0);
    dailySales += orderValue;
    totalOrdersCount += 1;

    const newOrder = {
        id: `#ORD-${0 + totalOrdersCount}`,
        items: cart.map(i => i.name).join(", "),
        total: orderValue,
        status: "Completed"
    };

    addOrderToHistory(newOrder);

    document.getElementById('total-sales').innerText = `₱${dailySales.toFixed(2)}`;
    document.getElementById('order-count').innerText = totalOrdersCount;

    if (typeof updateCharts === "function") updateCharts();

    // >>> CALL THE NEW LOG FUNCTION <<<
    logActivity(`Order #${0 + totalOrdersCount} completed.`);

    cart.length = 0; 
    renderCart();
    
    // Optional: Play a sound or show a toast
    // alert("Order successfully punched!"); // Commented out to be less annoying
}

// --- INITIALIZATION ---
renderMenu();
startClock(); // Start the clock
logActivity("System online. Ready for service.");

// --- INITIALIZATION ---
// Start the app
renderMenu();
