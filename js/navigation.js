document.addEventListener("DOMContentLoaded", () => {

    console.log("App loaded");

    showSplash();

    setTimeout(() => {
        showDashboard();
    }, 2000);

});

function hideAll() {
    document.getElementById("splash").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("expensesPage").style.display = "none";
}

function showSplash() {
    hideAll();
    document.getElementById("splash").style.display = "flex";
}

function showDashboard() {
    hideAll();
    document.getElementById("dashboard").style.display = "block";
}

function showExpenses() {
    hideAll();
    document.getElementById("expensesPage").style.display = "block";
}

function backHome() {
    showDashboard();
}

function openExpenseModal() {
    document.getElementById("expenseModal").style.display = "flex";
}

function closeExpenseModal() {
    document.getElementById("expenseModal").style.display = "none";
}

window.showExpenses = showExpenses;
window.backHome = backHome;
window.openExpenseModal = openExpenseModal;
window.closeExpenseModal = closeExpenseModal;
window.showDashboard = showDashboard;
