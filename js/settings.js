// --- FUNCTIONS ---

function saveSettings(event) {
    event.preventDefault(); // Stop page reload
    
    const storeName = document.getElementById('setting-store-name').value;
    const userName = document.getElementById('setting-user-name').value;
    const isDarkMode = document.getElementById('setting-dark-mode').checked;

    // Apply Changes to DOM
    const titleEl = document.getElementById('app-title');
    const greetEl = document.getElementById('user-greeting');
    
    if (titleEl) titleEl.innerText = storeName;
    if (greetEl) greetEl.innerText = 'Welcome back, ${userName}!';
    
    // Toggle Theme
    if (isDarkMode) {
        document.body.style.backgroundColor = "#2f2e41";
        document.body.style.color = "#f9f5f0";
    } else {
        document.body.style.backgroundColor = "#f9f5f0";
        document.body.style.color = "#4a2c2a";
    }

    alert("Settings Saved Successfully!");
    
    // Return to dashboard via global function
    if (typeof showMenu === 'function') {
        showMenu();
    }
}
