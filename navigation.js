// ==========================
// Navigation System
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    showSplash();

    setTimeout(() => {
        showDashboard();
    }, 2000);

});

function hideAllScreens() {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.add("hidden");
    });

    document.getElementById("splash").classList.add("hidden");
}


// Screens
function showSplash() {
    hideAllScreens();
    document.getElementById("splash").classList.remove("hidden");
}

function showDashboard() {
    hideAllScreens();
    document.getElementById("dashboard").classList.remove("hidden");
}

function showExpenses() {
    hideAllScreens();
    document.getElementById("expensesPage").classList.remove("hidden");
}

function backHome() {
    showDashboard();
}


// Modal
function openExpenseModal() {
    document.getElementById("expenseModal").classList.remove("hidden");
}

function closeExpenseModal() {
    document.getElementById("expenseModal").classList.add("hidden");
}


// Global access
window.showExpenses = showExpenses;
window.backHome = backHome;
window.showDashboard = showDashboard;

window.openExpenseModal = openExpenseModal;
window.closeExpenseModal = closeExpenseModal;
