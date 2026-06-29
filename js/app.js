let expenses = [];

function showTab(tab) {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(tab).classList.add("active");
}

function openAddExpense() {
    document.getElementById("expenseModal").classList.remove("hidden");
}

function closeAddExpense() {
    document.getElementById("expenseModal").classList.add("hidden");
}

function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const cost = document.getElementById("cost").value;

    expenses.push({ item, vendor, cost });

    renderExpenses();

    closeAddExpense();
}

function renderExpenses() {

    const list = document.getElementById("expenseList");

    list.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.vendor}<br>
            RM ${e.cost}
        `;

        list.appendChild(div);
    });
}
