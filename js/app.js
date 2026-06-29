
/* =========================
   FIREBASE IMPORTS
========================= */

import {
    db,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "./firebase.js";


/* =========================
   GLOBAL STATE
========================= */

let expenses = [];
let editId = null;


/* =========================
   SAFE SPLASH (NO STUCK EVER)
========================= */

function startApp() {

    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    if (splash) splash.style.display = "flex";
    if (app) app.classList.add("hidden");

    setTimeout(() => {

        if (splash) splash.style.display = "none";
        if (app) app.classList.remove("hidden");

        showTab("dashboard");

    }, 1500);
}


/* =========================
   START APP (SAFE WRAPPER)
========================= */

window.addEventListener("load", () => {
    console.log("APP LOADED");

    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    if (splash) splash.remove();
    if (app) app.classList.remove("hidden");
});


/* =========================
   NAVIGATION
========================= */

function showTab(tab) {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    const target = document.getElementById(tab);

    if (target) {
        target.classList.add("active");
    }
}

window.showTab = showTab;


/* =========================
   MODAL CONTROL
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
   FIREBASE LIVE LISTENER
========================= */

function loadExpenses() {

    try {

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

    } catch (err) {
        console.error("Firestore error:", err);
    }
}

loadExpenses();


/* =========================
   SAVE / EDIT EXPENSE
========================= */

async function saveExpense() {

    try {

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
            remaining: cost - paid,
            updatedAt: new Date()
        };

        if (editId) {

            await updateDoc(doc(db, "expenses", editId), data);
            editId = null;

        } else {

            await addDoc(collection(db, "expenses"), {
                ...data,
                createdAt: new Date()
            });
        }

        closeAddExpense();

    } catch (err) {
        console.error("Save error:", err);
    }
}

window.saveExpense = saveExpense;


/* =========================
   EDIT EXPENSE
========================= */

function editExpense(id) {

    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    editId = id;

    document.getElementById("item").value = exp.item;
    document.getElementById("vendor").value = exp.vendor;
    document.getElementById("category").value = exp.category || "Other";
    document.getElementById("cost").value = exp.cost;
    document.getElementById("paid").value = exp.paid;

    openAddExpense();
}

window.editExpense = editExpense;


/* =========================
   DELETE EXPENSE
========================= */

async function deleteExpense(id) {

    try {
        await deleteDoc(doc(db, "expenses", id));
    } catch (err) {
        console.error("Delete error:", err);
    }
}

window.deleteExpense = deleteExpense;


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
            <div>
                <b>${e.item}</b><br>
                <small>${e.category || "Other"}</small><br>
                ${e.vendor}<br>
                RM ${e.cost} | Paid RM ${e.paid} | Left RM ${e.remaining}
            </div>

            <div class="actions">
                <button class="editBtn" onclick="editExpense('${e.id}')">Edit</button>
                <button class="deleteBtn" onclick="deleteExpense('${e.id}')">Delete</button>
            </div>
        `;

        list.appendChild(div);
    });
}


/* =========================
   DASHBOARD (SAFE VERSION)
========================= */

function updateDashboard() {

    let totalSpent = 0;

    expenses.forEach(e => {
        totalSpent += Number(e.paid || 0);
    });

    const budgetInput = document.getElementById("budgetInput");
    const budget = Number(budgetInput ? budgetInput.value : 0);

    const remaining = budget - totalSpent;

    const spentEl = document.getElementById("totalSpent");
    const remainEl = document.getElementById("totalRemaining");
    const bar = document.getElementById("progressFill");

    if (spentEl) spentEl.innerText = `RM ${totalSpent}`;
    if (remainEl) remainEl.innerText = `RM ${remaining}`;

    if (bar) {
        const percent = budget > 0 ? (totalSpent / budget) * 100 : 0;
        bar.style.width = Math.min(percent, 100) + "%";
    }

    const recent = document.getElementById("recentExpenses");

    if (recent) {

        recent.innerHTML = "";

        [...expenses].slice(-3).reverse().forEach(e => {

            const div = document.createElement("div");
            div.className = "expenseItem";

            div.innerHTML = `
                <div>
                    <b>${e.item}</b><br>
                    RM ${e.paid}
                </div>
            `;

            recent.appendChild(div);
        });
    }
}


/* =========================
   FORM RESET
========================= */

function clearForm() {

    const ids = ["item", "vendor", "category", "cost", "paid"];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
}
