// ==========================
// App Core (temporary)
// ==========================

function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const cost = document.getElementById("cost").value;
    const deposit = document.getElementById("deposit").value;
    const desc = document.getElementById("desc").value;

    const expense = {
        item,
        vendor,
        cost,
        deposit,
        desc,
        createdAt: new Date()
    };

    console.log("Expense Saved:", expense);

    alert("Expense saved (temporary - no database yet)");

    // close modal after save
    document.getElementById("expenseModal").classList.add("hidden");
}


// expose globally
window.saveExpense = saveExpense;

