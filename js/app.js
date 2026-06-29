
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


/* =========================
   SPLASH (SAFE)
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const splash = document.getElementById("splash");
        const app = document.getElementById("app");

        if (splash) splash.style.display = "none";
        if (app) app.classList.remove("hidden");

    }, 1200);
});


/* =========================
   MODAL
========================= */

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


/* =========================
   FIREBASE
========================= */

onSnapshot(collection(db, "expenses"), (snapshot) => {

    expenses = [];

    snapshot.forEach(docSnap => {
        expenses.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    renderExpenses();
    updateDashboard();
});


/* =========================
   SAVE EXPENSE
========================= */

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
        editId = null;
    } else {
        await addDoc(collection(db, "expenses"), data);
    }

    closeAddExpense();
}

window.saveExpense = saveExpense;


/* =========================
   RENDER EXPENSES
========================= */

function renderExpenses() {

    const list = document.getElementById("expenseList");
    if (!list) return;

    list.innerHTML = "";

    expenses.forEach(e => {

        const div = document.createElement("div");
        div.className = "expenseItem";

        div.innerHTML = `
            <b>${e.item}</b><br>
            ${e.category}<br>
            RM ${e.cost}
        `;

        list.appendChild(div);
    });
}


/* =========================
   DASHBOARD UPGRADE
========================= */

function updateDashboard() {

    let totalSpent = 0;

    expenses.forEach(e => {
        totalSpent += Number(e.paid || 0);
    });

    const budget = Number(document.getElementById("budgetInput")?.value || 0);

    const remaining = budget - totalSpent;

    const spentEl = document.getElementById("totalSpent");
    const remainEl = document.getElementById("totalRemaining");
    const progress = document.getElementById("progressFill");

    if (spentEl) spentEl.innerText = `RM ${totalSpent}`;
    if (remainEl) remainEl.innerText = `RM ${remaining}`;

    if (progress) {
        const percent = budget > 0 ? (totalSpent / budget) * 100 : 0;
        progress.style.width = `${Math.min(percent, 100)}%`;
    }

    const recent = document.getElementById("recentExpenses");

    if (recent) {

        recent.innerHTML = "";

        const latest = [...expenses].slice(-3).reverse();

        latest.forEach(e => {

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


/* =========================
   INPUT LISTENER
========================= */

document.addEventListener("input", (e) => {

    if (e.target.id === "budgetInput") {
        updateDashboard();
    }
});


/* =========================
   CLEAR FORM
========================= */

function clearForm() {

    ["item", "vendor", "cost", "paid"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
}
