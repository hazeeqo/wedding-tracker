// ==========================
// Navigation System (FIXED)
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // FORCE initial state
    hideAllScreens();
    showSplash();

    // Move to dashboard after delay
    setTimeout(() => {
        showDashboard();
    }, 2000);

});


// ==========================
// Helper
// ==========================

function hideAllScreens() {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.add("hidden");
    });

    const splash = document.getElementById("splash");
    if (splash) splash.classList.add("hidden");
}


// ==========================
// Screens
// ==========================

function showSplash() {
    hideAllScreens();

    const splash = document.getElementById("splash");
    if (splash) splash.classList.remove("hidden");
}

function showDashboard() {
    hideAllScreens();

    const dash = document.getElementById("dashboard");
    if (dash) dash.classList.remove("hidden");

    // IMPORTANT: load data if exists
    if (window.renderAll) {
        window.renderAll();
    }
}

function showExpenses() {
    hideAllScreens();

    const exp = document.getElementById("expensesPage");
    if (exp) exp.classList.remove("hidden");
}

function backHome() {
    showDashboard();
}


// ==========================
// Modal
// ==========================

function openExpenseModal() {
    document.getElementById("expenseModal").classList.remove("hidden");
}

function closeExpenseModal() {
    document.getElementById("expenseModal").classList.add("hidden");
}


// ==========================
// Expose globally
// ==========================

window.showExpenses = showExpenses;
window.backHome = backHome;
window.showDashboard = showDashboard;

window.openExpenseModal = openExpenseModal;
window.closeExpenseModal = closeExpenseModal;
