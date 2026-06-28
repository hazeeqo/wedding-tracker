// ==========================
// Navigation System
// Handles screen switching
// ==========================

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {

    // Show splash first
    showSplash();

    // After 2 seconds go to dashboard
    setTimeout(() => {
        showDashboard();
    }, 2000);
});


// ==========================
// Screen Helper
// ==========================

function hideAllScreens() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById("splash").classList.add("hidden");
}


// ==========================
// Navigation Functions
// ==========================

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

function openForm() {
    hideAllScreens();
    document.getElementById("formPage").classList.remove("hidden");
}

function closeForm() {
    showExpenses();
}


// ==========================
// Make functions global
// (so HTML onclick can access them)
// ==========================

window.showExpenses = showExpenses;
window.backHome = backHome;
window.openForm = openForm;
window.closeForm = closeForm;
window.showDashboard = showDashboard;
