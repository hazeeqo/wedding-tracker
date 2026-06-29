
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
   STATE
========================= */

let expenses = [];
let editId = null;


/* =========================
   SPLASH SCREEN
========================= */

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");
    const app = document.getElementById("app");

    splash.style.display = "flex";
    app.classList.add("hidden");

    setTimeout(() => {

        splash.style.display = "none";
        app.classList.remove("hidden");

        showTab("dashboard");

    }, 1500);
});

document.addEventListener("input", (e) => {

    if (e.target.id === "budgetInput") {
        updateDashboard();
    }

});
function updateDashboard() {

    let totalSpent = 0;

    expenses.forEach(e => {
        totalSpent += Number(e.paid || 0);
    });

    const budget = Number(document.getElementById("budgetInput")?.value || 0);

    const remaining = budget - totalSpent;

    document.getElementById("totalSpent").innerText = `RM ${totalSpent}`;
    document.getElementById("totalRemaining").innerText = `RM ${remaining}`;

    // progress
    const percent = budget > 0 ? (totalSpent / budget) * 100 : 0;

    const progress = document.getElementById("progressFill");
    if (progress) {
        progress.style.width = `${Math.min(percent, 100)}%`;
    }

    // recent expenses
    const recent = document.getElementById("recentExpenses");

    if (recent) {

        recent.innerHTML = "";

        const latest = [...expenses].slice(-3).reverse();

        latest.forEach(e => {

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
   NAVIGATION
========================= */

function showTab(tab) {

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    document.getElementById(tab).classList.add("active");
}

window.showTab = showTab;


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
   FIREBASE LIVE LOAD
========================= */

function loadExpenses() {

    onSnapshot(collection(db, "expenses"), (snapshot) => {

        expenses = [];

        snapshot.forEach(docSnap => {
            expenses.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        renderExpenses();
        updateDashboard(); // 👈 ADD THIS
    });
}

loadExpenses();


/* =========================
   SAVE / EDIT EXPENSE
========================= */

async function saveExpense() {

    const item = document.getElementById("item").value;
    const vendor = document.getElementById("vendor").value;
    const cost = Number(document.getElementById("cost").value);
    const paid = Number(document.getElementById("paid").value);

    const data = {
        item,
        vendor,
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
    document.getElementById("cost").value = exp.cost;
    document.getElementById("paid").value = exp.paid;

    openAddExpense();
}

window.editExpense = editExpense;


/* =========================
   DELETE EXPENSE
========================= */

async function deleteExpense(id) {

    await deleteDoc(doc(db, "expenses", id));
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
   CLEAR FORM
========================= */

function clearForm() {

    document.getElementById("item").value = "";
    document.getElementById("vendor").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("paid").value = "";
}
