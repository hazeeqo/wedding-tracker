
import {
    db,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "./firebase.js";

let expenses = [];
let editId = null;

/* SPLASH */
window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
    }, 1500);
});

/* MODAL */
function openAddExpense() {
    document.getElementById("expenseModal").classList.remove("hidden");
}

function closeAddExpense() {
    document.getElementById("expenseModal").classList.add("hidden");
    clearForm();
    editId = null;
}

window.openAddExpense = openAddExpense;
window.closeAddExpense = closeAddExpense;

/* FIREBASE */
onSnapshot(collection(db, "expenses"), (snapshot) => {

    expenses = [];

    snapshot.forEach(d => {
        expenses.push({ id: d.id, ...d.data() });
    });

    renderExpenses();
    updateDashboard();
});

/* SAVE */
async function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const category = document.getElementById("category").value;
    const cost = Number(document.getElementById("cost").value);
    const paid = Number(document.getElementById("paid").value);

    const data = {
        item,
        vendor,
        category,
        cost,
        paid,
        remaining: cost - paid
    };

    if (editId) {
        await updateDoc(doc(db, "expenses", editId), data);
    } else {
        await addDoc(collection(db, "expenses"), data);
    }

    closeAddExpense();
}

window.saveExpense = saveExpense;

/* RENDER */
function renderExpenses() {

    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseItem";

        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.vendor}<br>
            RM ${e.cost}
        `;

        list.appendChild(div);
    });
}

/* DASHBOARD */
function updateDashboard() {

    let totalSpent = 0;

    expenses.forEach(e => totalSpent += Number(e.paid || 0));

    document.getElementById("totalSpent").innerText = "RM " + totalSpent;
    document.getElementById("totalRemaining").innerText = "RM " + (0 - totalSpent);

    const recent = document.getElementById("recentExpenses");
    if (recent) {

        recent.innerHTML = "";

        expenses.slice(-3).reverse().forEach(e => {

            const div = document.createElement("div");
            div.className = "expenseItem";

            div.innerHTML = `
                <b>${e.item}</b><br>
                RM ${e.paid}
            `;

            recent.appendChild(div);
        });
    }
}

/* CLEAR */
function clearForm() {
    ["item","vendor","cost","paid"].forEach(id => {
        document.getElementById(id).value = "";
    });
}
