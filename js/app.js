let expenses = [];

function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const cost = Number(document.getElementById("cost").value);
    const deposit = Number(document.getElementById("deposit").value);
    const desc = document.getElementById("desc").value;

    const expense = {
        id: Date.now(),
        item,
        vendor,
        cost,
        deposit,
        remaining: cost - deposit,
        desc
    };

    expenses.push(expense);

    closeExpenseModal();
    clearForm();

    render();
}

function render() {

    const list = document.getElementById("expenseList");
    const recent = document.getElementById("recentExpenseList");

    list.innerHTML = "";
    recent.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseCard";
        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.vendor}<br>
            RM ${e.cost}
        `;

        list.appendChild(div);
    });

    expenses.slice(-3).forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseCard";
        div.innerHTML = `${e.item} - RM ${e.cost}`;

        recent.appendChild(div);
    });
}

function clearForm() {
    document.getElementById("item").value = "";
    document.getElementById("vendor").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("deposit").value = "";
    document.getElementById("desc").value = "";
}

window.saveExpense = saveExpense;
window.render = render;
