let orderHistory = []; 

function renderOrderHistory() {
    const tbody = document.getElementById('order-history-body');
    if (!tbody) return;

    if (orderHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-muted">No orders placed yet.</td></tr>';
        return;
    }
    
    tbody.innerHTML = orderHistory.map(order => `
        <tr>
            <td class="p-3 fw-bold text-primary">${order.id}</td>
            <td class="p-3 text-muted">${order.items}</td>
            <td class="p-3 text-end fw-bold">₱${order.total.toFixed(2)}</td>
            <td class="p-3 text-center"><span class="badge bg-success rounded-pill">Completed</span></td>
        </tr>
    `).join('');
}


function addOrderToHistory(order) {
    orderHistory.unshift(order);
}