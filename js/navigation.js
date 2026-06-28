document.addEventListener("DOMContentLoaded", () => {

    console.log("App loaded");

    // FORCE CLEAN START
    hideAll();

    showSplash();

    setTimeout(() => {
        showDashboard();
    }, 2000);

});

function hideAll() {
    document.getElementById("splash").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("expensesPage").style.display = "none";
    document.getElementById("expenseModal").style.display = "none";
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
    const modal = document.getElementById("expenseModal");
    modal.style.display = "flex";
    modal.classList.remove("hidden");
}

function closeExpenseModal() {
    const modal = document.getElementById("expenseModal");
    modal.style.display = "none";
    modal.classList.add("hidden");
}

window.showExpenses = showExpenses;
window.backHome = backHome;
window.openExpenseModal = openExpenseModal;
window.closeExpenseModal = closeExpenseModal;
window.showDashboard = showDashboard;
