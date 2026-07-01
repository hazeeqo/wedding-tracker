/* =========================
   WEDDING TRACKER APP JS
   CLEAN REWRITE (MODULE SAFE)
========================= */

let expenses = [];
let budget = 0;

/* =========================
   SPLASH CONTROL
========================= */
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    if (!splash || !app) {
        console.error("Missing splash or app elements");
        return;
    }

    // Ensure app is hidden initially
    app.classList.add("hidden");

    setTimeout(() => {
        splash.style.display = "none";
        app.classList.remove("hidden");

        initApp(); // start app AFTER splash
    }, 1200);
});


/* =========================
   INIT APP
========================= */
function initApp() {

    setupBudgetListener();
    setupButtons();
    renderExpenses();
    updateDashboard();

}


/* =========================
   SETUP BUTTONS
========================= */
function setupButtons() {

    const addBtn = document.getElementById("showExpenseBtn");

    if (addBtn) {
        addBtn.addEventListener("click", openAddExpense);
    }

}


/* =========================
   MODAL CONTROLS
========================= */
function openAddExpense() {
    const modal = document.getElementById("expenseModal");
    if (modal) modal.classList.remove("hidden");
}

function closeAddExpense() {
    const modal = document.getElementById("expenseModal");
    if (modal) modal.classList.add("hidden");
}


/* =========================
   SAVE EXPENSE
========================= */
function saveExpense() {

    const item = document.getElementById("item")?.value;
    const vendor = document.getElementById("vendor")?.value;
    const category = document.getElementById("category")?.value;
    const cost = parseFloat(document.getElementById("cost")?.value || 0);
    const paid = parseFloat(document.getElementById("paid")?.value || 0);

    if (!item || isNaN(cost)) {
        alert("Please enter valid expense data");
        return;
    }

    const expense = {
        id: Date.now(),
        item,
        vendor,
        category,
        cost,
        paid
    };

    expenses.push(expense);

    renderExpenses();
    updateDashboard();
    clearModal();
    closeAddExpense();
}


/* =========================
   CLEAR MODAL INPUTS
========================= */
function clearModal() {

    ["item", "vendor", "category", "cost", "paid"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

}


/* =========================
   RENDER EXPENSES
========================= */
function renderExpenses() {

    const list = document.getElementById("expenseList");
    const recent = document.getElementById("recentExpenses");

    if (!list) return;

    list.innerHTML = "";
    if (recent) recent.innerHTML = "";

    expenses.forEach(exp => {

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h4>${exp.item}</h4>
            <p>${exp.category} | ${exp.vendor || "No vendor"}</p>
            <p>Cost: RM ${exp.cost}</p>
        `;

        list.appendChild(div);

    });

    // show last 3
    if (recent) {
        expenses.slice(-3).forEach(exp => {
            const div = document.createElement("div");
            div.className = "card small";
            div.innerHTML = `
                <strong>${exp.item}</strong> - RM ${exp.cost}
            `;
            recent.appendChild(div);
        });
    }
}


/* =========================
   BUDGET SYSTEM
========================= */
function setupBudgetListener() {

    const budgetInput = document.getElementById("budgetInput");

    if (!budgetInput) return;

    budgetInput.addEventListener("input", (e) => {
        budget = parseFloat(e.target.value || 0);
        updateDashboard();
    });

}


/* =========================
   DASHBOARD UPDATE
========================= */
function updateDashboard() {

    const totalSpent = expenses.reduce((sum, e) => sum + e.cost, 0);
    const remaining = budget - totalSpent;

    const spentEl = document.getElementById("totalSpent");
    const remainingEl = document.getElementById("totalRemaining");
    const progress = document.getElementById("progressFill");

    if (spentEl) spentEl.textContent = `RM ${totalSpent}`;
    if (remainingEl) remainingEl.textContent = `RM ${remaining}`;

    if (progress && budget > 0) {
        const percent = (totalSpent / budget) * 100;
        progress.style.width = `${Math.min(percent, 100)}%`;
    }
}


/* =========================
   GLOBAL EXPORT (for HTML onclick)
========================= */
window.openAddExpense = openAddExpense;
window.closeAddExpense = closeAddExpense;
window.saveExpense = saveExpense;
