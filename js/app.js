/* =========================
   WEDDING TRACKER APP JS
   BASE VERSION (SAFE START)
========================= */

let expenses = [];
let budget = 0;


/* =========================
   INIT (SAFE ENTRY POINT)
========================= */
function init() {
    console.log("App initialized");

    setupBudget();
    setupButtons();
    renderExpenses();
    updateDashboard();
}


/* =========================
   BUDGET INPUT
========================= */
function setupBudget() {

    const budgetInput = document.getElementById("budgetInput");

    if (!budgetInput) return;

    budgetInput.addEventListener("input", (e) => {
        budget = parseFloat(e.target.value || 0);
        updateDashboard();
    });
}


/* =========================
   BUTTONS
========================= */
function setupButtons() {

    const addBtn = document.getElementById("showExpenseBtn");

    if (addBtn) {
        addBtn.addEventListener("click", openAddExpense);
    }
}


/* =========================
   MODAL
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
        alert("Invalid input");
        return;
    }

    expenses.push({
        id: Date.now(),
        item,
        vendor,
        category,
        cost,
        paid
    });

    renderExpenses();
    updateDashboard();
    closeAddExpense();
}


/* =========================
   RENDER EXPENSES
========================= */
function renderExpenses() {

    const list = document.getElementById("expenseList");
    const recent = document.getElementById("recentExpenses");

    if (!list) return;

    list.innerHTML = "";

    expenses.forEach(exp => {

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h4>${exp.item}</h4>
            <p>${exp.category || ""}</p>
            <p>RM ${exp.cost}</p>
        `;

        list.appendChild(div);
    });

    if (recent) {
        recent.innerHTML = "";

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
   DASHBOARD
========================= */
function updateDashboard() {

    const totalSpent = expenses.reduce((sum, e) => sum + e.cost, 0);

    const spentEl = document.getElementById("totalSpent");
    const remainingEl = document.getElementById("totalRemaining");
    const progress = document.getElementById("progressFill");

    if (spentEl) spentEl.textContent = `RM ${totalSpent}`;
    if (remainingEl) remainingEl.textContent = `RM ${budget - totalSpent}`;

    if (progress && budget > 0) {
        const percent = (totalSpent / budget) * 100;
        progress.style.width = `${Math.min(percent, 100)}%`;
    }
}


/* =========================
   START APP MANUALLY
   (IMPORTANT FOR DEBUGGING)
========================= */
init();


/* =========================
   GLOBAL EXPORTS (HTML ONCLICK)
========================= */
window.openAddExpense = openAddExpense;
window.closeAddExpense = closeAddExpense;
window.saveExpense = saveExpense;
